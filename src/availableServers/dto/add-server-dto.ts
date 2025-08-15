import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AddServerDto {
  @ApiProperty({description:"ip", required:true})
  @IsNotEmpty()
  ip: string;

  @ApiProperty({description:"port", required:true})
  @IsNotEmpty()
  @IsString()
  port: string;

  @IsOptional()
  username:string
  
  @IsOptional()
  password:string
}
