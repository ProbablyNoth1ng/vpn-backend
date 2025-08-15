import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { WireGuardService } from 'src/wireguard/wireguard.service';
import { SessionController } from './session.controller';
import { SessionService } from 'src/session/session.service';
@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaService, WireGuardService],
})
export class SessionModule {}
