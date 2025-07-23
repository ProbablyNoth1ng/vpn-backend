import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'prisma/prisma.service';
import { WireGuardService } from 'src/wireguard/wireguard.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, PrismaService, WireGuardService],
})
export class LoginModule {}
