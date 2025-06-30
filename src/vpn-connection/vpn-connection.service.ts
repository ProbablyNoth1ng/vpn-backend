import { Injectable } from '@nestjs/common';
import { CreateVpnConnectionDto } from './dto/create-vpn-connection.dto';
import { UpdateVpnConnectionDto } from './dto/update-vpn-connection.dto';

@Injectable()
export class VpnConnectionService {
  create(createVpnConnectionDto: CreateVpnConnectionDto) {
    return 'This action adds a new vpnConnection';
  }

  findAll() {
    return `This action returns all vpnConnection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vpnConnection`;
  }

  update(id: number, updateVpnConnectionDto: UpdateVpnConnectionDto) {
    return `This action updates a #${id} vpnConnection`;
  }

  remove(id: number) {
    return `This action removes a #${id} vpnConnection`;
  }
}
