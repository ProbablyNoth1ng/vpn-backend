import { PartialType } from '@nestjs/mapped-types';
import { CreateVpnConnectionDto } from './create-vpn-connection.dto';

export class UpdateVpnConnectionDto extends PartialType(CreateVpnConnectionDto) {
  id: number;
}
