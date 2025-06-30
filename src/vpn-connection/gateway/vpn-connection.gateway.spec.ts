import { Test, TestingModule } from '@nestjs/testing';
import { VpnConnectionGateway } from './vpn-connection.gateway';
import { VpnConnectionService } from '../vpn-connection.service';

describe('VpnConnectionGateway', () => {
  let gateway: VpnConnectionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VpnConnectionGateway, VpnConnectionService],
    }).compile();

    gateway = module.get<VpnConnectionGateway>(VpnConnectionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
