import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { VpnConnectionModule } from './vpn-connection/vpn-connection.module';
import { ResetModule } from 'src/reset-password/reset.module';
import { LoginModule } from './login/login.module';
@Module({
  imports: [RegistrationModule, LoginModule, VpnConnectionModule, ResetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
