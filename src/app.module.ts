import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { VpnConnectionModule } from './vpn-connection/vpn-connection.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [RegistrationModule, VpnConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
