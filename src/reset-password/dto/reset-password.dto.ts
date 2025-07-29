import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({description:"User token", required: true})
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({description:"New password", required: true})
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
