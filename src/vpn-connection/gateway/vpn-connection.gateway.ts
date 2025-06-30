import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { VpnConnectionService } from '../vpn-connection.service';
import { CreateVpnConnectionDto } from '../dto/create-vpn-connection.dto';
import { UpdateVpnConnectionDto } from '../dto/update-vpn-connection.dto';

@WebSocketGateway()
export class VpnConnectionGateway {
  constructor(private readonly vpnConnectionService: VpnConnectionService) {}

  @SubscribeMessage('createVpnConnection')
  create(@MessageBody() createVpnConnectionDto: CreateVpnConnectionDto) {
    return this.vpnConnectionService.create(createVpnConnectionDto);
  }

  @SubscribeMessage('findAllVpnConnection')
  findAll() {
    return this.vpnConnectionService.findAll();
  }

  @SubscribeMessage('findOneVpnConnection')
  findOne(@MessageBody() id: number) {
    return this.vpnConnectionService.findOne(id);
  }

  @SubscribeMessage('updateVpnConnection')
  update(@MessageBody() updateVpnConnectionDto: UpdateVpnConnectionDto) {
    return this.vpnConnectionService.update(updateVpnConnectionDto.id, updateVpnConnectionDto);
  }

  @SubscribeMessage('removeVpnConnection')
  remove(@MessageBody() id: number) {
    return this.vpnConnectionService.remove(id);
  }
}
