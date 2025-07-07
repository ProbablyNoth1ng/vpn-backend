import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RequestResetDto } from 'src/reset-password/dto/request-reset.dto';
import { ResetPasswordDto } from 'src/reset-password/dto/reset-password.dto';
import { EmailService } from 'src/registration/services/email.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async requestPasswordReset(dto: RequestResetDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) return { message: 'User not found' };

    const token = uuidv4();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email: dto.email },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    await this.emailService.sendResetPasswordEmail(dto.email, token);

    console.log(`Reset token: ${token}`);
    return { message: 'Reset token sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: dto.token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) return { message: 'Invalid or expired token' };

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password updated successfully' };
  }
}
