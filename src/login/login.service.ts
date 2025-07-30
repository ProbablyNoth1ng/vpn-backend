import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Response, Request } from 'express';
import { WireGuardService } from 'src/wireguard/wireguard.service';
import { SessionService } from 'src/session/session.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wireguardService: WireGuardService,
    private readonly sessionService: SessionService,
  ) {}

  async login(req: Request, res: Response, createLoginDto: CreateLoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: createLoginDto.email },
    });

    if (!user) {
      console.log('User not found');
      return { message: 'User not found' };
    }

    if (!user.isVerified) {
      console.log('User not verified');
      return { message: 'User not verified' };
    }

    const tokenPayload = `${user.id},${user.email},${user.password}`;
    const token = Buffer.from(tokenPayload).toString('base64');

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 2,
    });

    await this.sessionService.createSession(user.id, token, req);

    let client = await this.prisma.wireGuardClient.findFirst({
      where: { userId: user.id },
    });

    if (!client) {
      const keys = this.wireguardService.generateKeyPair();
      const ipAddress = `10.0.0.${user.id + 1}`;

      client = await this.prisma.wireGuardClient.create({
        data: {
          userId: user.id,
          privateKey: keys.privateKey,
          publicKey: keys.publicKey,
          ipAddress,
        },
      });

      console.log(`WireGuard client created for user ${user.email}`);
    } else {
      console.log(`WireGuard client already exists for user ${user.email}`);
    }

    const serverPublicKey = this.wireguardService.getServerPublicKey();
    const endpoint = '<your-vpn-server-ip-or-domain>:51820';

    const config = this.wireguardService.generateClientConfig({
      privateKey: client.privateKey,
      address: `${client.ipAddress}/32`,
      serverPublicKey,
      endpoint,
      dns: '1.1.1.1',
    });

    const configsDir = path.join(process.cwd(), 'configs');
    if (!fs.existsSync(configsDir)) {
      fs.mkdirSync(configsDir);
    }

    const filePath = path.join(configsDir, `client-${user.id}.conf`);
    fs.writeFileSync(filePath, config);

    console.log(`WireGuard config saved to ${filePath}`);

    return { message: 'Logged in', configPath: filePath };
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies['auth_token'];

    if (token) {
      await this.sessionService.deactivateSession(token);

      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      return { message: 'Logged out' };
    }

    return { message: 'No auth token found' };
  }
}
