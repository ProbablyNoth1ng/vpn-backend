import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddServerDto {
  @ApiProperty({ description: 'ip', required: true })
  @IsNotEmpty()
  @IsString()
  ip: string;

  @ApiProperty({ description: 'port', required: true })
  @IsNotEmpty()
  @IsString()
  port: string;

  @ApiProperty({ description: 'publicKey', required: true })
  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @ApiProperty({ description: 'subnet', required: true })
  @IsNotEmpty()
  @IsString()
  subnet: string;

  @ApiProperty({ description: 'country', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'username', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'password', required: false })
  @IsOptional()
  @IsString()
  password?: string;
}
