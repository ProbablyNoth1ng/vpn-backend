import { IsEmail, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
  @ApiProperty({description:"User's email to login", required:true})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description:"User's password to login", required:true})
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginConfigPath{
  configPath:string
}