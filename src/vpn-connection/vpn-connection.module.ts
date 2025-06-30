import { Module } from '@nestjs/common';
import { VpnConnectionService } from './vpn-connection.service';
import { VpnConnectionGateway } from './gateway/vpn-connection.gateway';

@Module({
  providers: [VpnConnectionGateway, VpnConnectionService],
})
export class VpnConnectionModule {}
