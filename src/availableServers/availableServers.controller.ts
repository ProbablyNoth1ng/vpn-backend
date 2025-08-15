import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvailableServersService } from './availableServers.service';
import { AddServerDto } from './dto/add-server-dto';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';


@Controller('/servers')
export class AvailableServersController {
  constructor(private readonly availableServersService: AvailableServersService) {}

  @ApiOperation({summary:"Add new server"})
  @ApiCreatedResponse({
    description:"server added",
  })
  @Post()
  create(@Body() addServerDTO: AddServerDto) {
    return this.availableServersService.addServer(addServerDTO);
  }

  @ApiOperation({summary:"Get all servers"})
  @Get()
  findAll() {
    return this.availableServersService.getAllServers();
  }

  @ApiOperation({summary:"Find server from db by ip"})
  @ApiCreatedResponse({
    description:"server data",
  })
  @Get(':ip')
  findOne(@Param('ip') ip: string) {
    return this.availableServersService.getCertainServer(ip);
  }

}
