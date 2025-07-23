import { Injectable } from '@nestjs/common';
import * as sodium from 'libsodium-wrappers';

@Injectable()
export class WireGuardService {
  async generateKeyPair(): Promise<{ privateKey: string; publicKey: string }> {
    await sodium.ready;

    const keyPair = sodium.crypto_kx_keypair();

    return {
      privateKey: sodium.to_base64(keyPair.privateKey),
      publicKey: sodium.to_base64(keyPair.publicKey),
    };
  }
}
