import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${code}`,
      html: `<p>Your verification code is: <b>${code}</b></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(to: string, token: string, tokenExpiry:Date): Promise<void> {
    const resetLink = `http://localhost:5173/reset-password?token=${token}&expiry=${tokenExpiry}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'Reset your password',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
