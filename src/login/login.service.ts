import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Response, Request } from 'express';
import { WireGuardService } from 'src/wireguard/wireguard.service';
import { SessionService } from 'src/session/session.service';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wireguardService: WireGuardService,
    private readonly sessionService: SessionService,
  ) {}

  async login(
    req: Request,
    res: Response,
    createLoginDto: CreateLoginDto,
    ip: string,
  ) {
    const country = await this.lookUpCountry(ip);
    const user = await this.prisma.client.user.findFirst({
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

    const tokenPayload = `${user.id},${user.email},${user.password},${Date.now()}`;
    const token = Buffer.from(tokenPayload).toString('base64');

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 2,
    });

    const exist = await this.prisma.client.userSession.findUnique({
      where: { token },
    });
    if (!exist) {
      await this.sessionService.createSession(user.id, token, req);
    }

    let server = await this.prisma.client.serversList.findFirst({
      where: { country: country },
    });
    if (!server) {
      server = await this.prisma.client.serversList.findFirst();
    }
    if (!server) {
      return { message: 'No available servers' };
    }

    let client = await this.prisma.client.wireGuardClient.findFirst({
      where: { userId: user.id },
    });

    if (!client) {
      const keys = this.wireguardService.generateKeyPair();

      const lastClient = await this.prisma.client.wireGuardClient.findFirst({
        where: {},
        orderBy: { id: 'desc' },
      });

      const baseSubnet = '10.8.0.0';
      const offset = lastClient ? lastClient.id + 2 : 2;
      const vpnIp = this.nextIp(baseSubnet, offset);

      client = await this.prisma.client.wireGuardClient.create({
        data: {
          userId: user.id,
          privateKey: keys.privateKey,
          publicKey: keys.publicKey,
          ipAddress: vpnIp,
          country: country,
        },
      });

      console.log(`WireGuard client created for user ${user.email}`);
    }

    const config = this.wireguardService.generateClientConfig({
      privateKey: client.privateKey,
      address: `${client.ipAddress}/32`,
      serverPublicKey: server.publicKey,
      endpoint: `${server.ip}:${server.port}`,
      dns: '1.1.1.1',
    });

    const configsDir = path.join(process.cwd(), 'configs');
    if (!fs.existsSync(configsDir)) fs.mkdirSync(configsDir);

    const filePath = path.join(configsDir, `client-${user.id}.conf`);
    fs.writeFileSync(filePath, config);

    console.log(`WireGuard config saved to ${filePath}`);
    console.log(`user's ip ${ip}`);

    return { message: 'Logged in', configUrl: '/login/config' };
  }

  private nextIp(base: string, offset: number): string {
    const parts = base.split('.').map(Number);
    parts[3] += offset;
    return parts.join('.');
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies['auth_token'];

    if (token) {
      await this.sessionService.deactivateSession(token);

      const decoded = Buffer.from(token, 'base64').toString('ascii');
      const [userIdStr] = decoded.split(',');
      const userId = parseInt(userIdStr, 10);

      if (isNaN(userId)) {
        return { message: 'Invalid token' };
      }

      await this.prisma.client.userSession.deleteMany({
        where: { token },
      });

      const filePath = path.join(
        process.cwd(),
        'configs',
        `client-${userId}.conf`,
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`WireGuard config deleted for user ${userId}`);
      }

      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      console.log('logged out');
      return { message: 'Logged out' };
    }

    return { message: 'No auth token found' };
  }

  async lookUpCountry(ip: string): Promise<string> {
    try {
      const res = await axios.get(`http://ip-api.com/json/${ip}`);
      return res.data?.country || 'Unknown';
    } catch {
      return 'Unknown';
    }
  }
}
