import { IsEmail, IsOptional, IsUrl } from 'class-validator';

export class RequestResetDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  frontendUrl?: string;
}
