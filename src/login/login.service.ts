import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Response, Request } from 'express';
import { WireGuardService } from 'src/wireguard/wireguard.service';
@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wireguardService: WireGuardService,
  ) {}

  async login(res: Response, createLoginDto: CreateLoginDto) {
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

    const existingClient = await this.prisma.wireGuardClient.findFirst({
      where: { userId: user.id },
    });

    if (!existingClient) {
      const keys = await this.wireguardService.generateKeyPair();
      const ipAddress = `10.0.0.${user.id + 1}`;

      await this.prisma.wireGuardClient.create({
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

    return { message: 'Logged in' };
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies['auth_token'];

    if (token) {
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
