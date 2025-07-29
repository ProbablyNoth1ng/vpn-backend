import { Controller, Post, Body } from '@nestjs/common';
import { ResetService } from 'src/reset-password/reset.service';
import { RequestResetDto } from 'src/reset-password/dto/request-reset.dto';
import { ResetPasswordDto } from 'src/reset-password/dto/reset-password.dto';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags("Password Reset")

@Controller('password')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}


  @ApiOperation({summary:"Sends link to user's email"})
  @ApiCreatedResponse({
      description:"Reset token send",
  })
  @Post('request')
  requestReset(@Body() dto: RequestResetDto) {
    return this.resetService.requestPasswordReset(dto);
  }

  @ApiOperation({summary:"Resets user's password"})
  @ApiCreatedResponse({
      description:"Password updated successfully",
  })
  @Post('reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetService.resetPassword(dto);
  }
}
