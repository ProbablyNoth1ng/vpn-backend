import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { PrismaService } from 'prisma/prisma.service';
import { VerificationService } from 'src/registration/verification/verification.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly verificationService: VerificationService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User | string> {
    if (typeof data.createdAt === 'string') {
      data.createdAt = new Date(data.createdAt);
    }

    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      console.log('DUPLICATE');
      return 'User already exist';
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const verificationCode =
      await this.verificationService.sendVerificationCode(data.email);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
      },
    });

    console.log('Added to DB:', user);
    console.log(`Verification code sent to ${user.email}: ${verificationCode}`);

    return user;
  }

  async verifyEmail(email: string, code: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('Email is already verified');
    }

    if (user.verificationCode !== code) {
      throw new Error('Invalid verification code');
    }

    return this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
