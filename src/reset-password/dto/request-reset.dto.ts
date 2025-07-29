import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class RequestResetDto {
  @ApiProperty({description:"User email", example:"dodep47@gmail.com" , required:true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description:"Url from frontend", example:"linkkk", required:true})
  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  frontendUrl?: string;
}
