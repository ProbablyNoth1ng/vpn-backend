import { Module } from '@nestjs/common';
import { AvailableServersService } from './availableServers.service';
import { AvailableServersController } from './availableServers.controller';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  controllers: [AvailableServersController],
  providers: [
    PrismaService,
    AvailableServersService
  ],

})
export class AvailableServersModule {}