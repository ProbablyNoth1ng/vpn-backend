import { Module } from '@nestjs/common';
import { ResetController } from 'src/reset-password/reset.controller';
import { ResetService } from 'src/reset-password/reset.service';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from 'src/registration/services/email.service';

@Module({
  controllers: [ResetController],
  providers: [ResetService, PrismaService, EmailService],
})
export class ResetModule {}
