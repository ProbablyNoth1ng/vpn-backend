import { Test, TestingModule } from '@nestjs/testing';
import { VpnConnectionService } from './vpn-connection.service';

describe('VpnConnectionService', () => {
  let service: VpnConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VpnConnectionService],
    }).compile();

    service = module.get<VpnConnectionService>(VpnConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
