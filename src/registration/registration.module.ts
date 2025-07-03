import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from 'src/registration/services/email.service';
import { VerificationService } from 'src/registration/verification/verification.service';
@Module({
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    PrismaService,
    EmailService,
    VerificationService,
  ],
  exports: [VerificationService],
})
export class RegistrationModule {}
