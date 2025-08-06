import { IsEmail, IsString, IsNotEmpty, IsOptional, isString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSession {
  @ApiProperty({description:"proxy server ip", required:true})
  @IsNotEmpty()
  @IsString()
  serverIp: string;

  @ApiProperty({description:"proxy server port", required:true})
  @IsNotEmpty()
  @IsString()
  port: string;

  @ApiProperty({description:"proxy server username", required:true})
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({description:"proxy server password", required:true})
  @IsNotEmpty()
  @IsString()
  password: string;

}
