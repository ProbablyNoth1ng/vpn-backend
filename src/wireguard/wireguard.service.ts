import { Injectable } from '@nestjs/common';
import * as nacl from 'tweetnacl';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WireGuardService {
  private serverPrivateKey: string;
  private serverPublicKey: string;

  constructor() {
    this.ensureServerKeys();
  }

  private ensureServerKeys() {
    const keysPath = path.join(__dirname, '../../configs/server-keys.json');

    if (fs.existsSync(keysPath)) {
      const data = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
      this.serverPrivateKey = data.privateKey;
      this.serverPublicKey = data.publicKey;
    } else {
      const keyPair = nacl.box.keyPair();
      this.serverPrivateKey = Buffer.from(keyPair.secretKey).toString('base64');
      this.serverPublicKey = Buffer.from(keyPair.publicKey).toString('base64');

      const dir = path.dirname(keysPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      fs.writeFileSync(
        keysPath,
        JSON.stringify(
          {
            privateKey: this.serverPrivateKey,
            publicKey: this.serverPublicKey,
          },
          null,
          2,
        ),
      );
    }
  }

  getServerPublicKey(): string {
    return this.serverPublicKey;
  }

  generateKeyPair(): { privateKey: string; publicKey: string } {
    const keyPair = nacl.box.keyPair();

    const privateKey = Buffer.from(keyPair.secretKey).toString('base64');
    const publicKey = Buffer.from(keyPair.publicKey).toString('base64');

    return { privateKey, publicKey };
  }

  generateClientConfig(params: {
    privateKey: string;
    address: string;
    dns?: string;
    serverPublicKey: string;
    endpoint: string;
    allowedIps?: string;
  }): string {
    const {
      privateKey,
      address,
      dns = '1.1.1.1',
      serverPublicKey,
      endpoint,
      allowedIps = '0.0.0.0/0',
    } = params;

    return `[Interface]
PrivateKey = ${privateKey}
Address = ${address}
DNS = ${dns}

[Peer]
PublicKey = ${serverPublicKey}
Endpoint = ${endpoint}
AllowedIPs = ${allowedIps}
PersistentKeepalive = 25
`;
  }
}
