import { Controller, Post, Body } from '@nestjs/common';
import { ResetService } from 'src/reset-password/reset.service';
import { RequestResetDto } from 'src/reset-password/dto/request-reset.dto';
import { ResetPasswordDto } from 'src/reset-password/dto/reset-password.dto';

@Controller('password')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('request')
  requestReset(@Body() dto: RequestResetDto) {
    return this.resetService.requestPasswordReset(dto);
  }

  @Post('reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetService.resetPassword(dto);
  }
}
