import { IsEmail, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistrationDto {
  @ApiProperty({description:"User email", required:true})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description:"User password", required:true})
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  createdAt?: Date | string;
}


export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  verificationCode: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty({ nullable: true })
  resetToken: string | null;

  @ApiProperty({ nullable: true })
  resetTokenExpiry: Date | null;
}