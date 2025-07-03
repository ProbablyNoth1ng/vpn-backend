import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/registration/services/email.service';

@Injectable()
export class VerificationService {
  constructor(private readonly emailService: EmailService) {}

  generateVerificationCode(length = 6): string {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async sendVerificationCode(email: string): Promise<string> {
    const code = this.generateVerificationCode();
    await this.emailService.sendVerificationEmail(email, code);
    return code;
  }
}
