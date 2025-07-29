import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({description:"User email to verify", required:true})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description:"Code from email", required:true})
  @IsNotEmpty()
  @IsString()
  code: string;
}
