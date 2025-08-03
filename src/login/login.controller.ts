import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, LoginConfigPath } from './dto/create-login.dto';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserIp } from 'src/clientIP/user-ip.decorator';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({
    description: 'Logged in',
    type: LoginConfigPath,
  })
  @Post('login')
  async login(
    @UserIp() ip:string,
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() createLoginDto: CreateLoginDto,
  ) {
    return this.loginService.login(req, res, createLoginDto, ip);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiCreatedResponse({
    description: 'Logged out',
  })
  @Post('logout')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    return this.loginService.logout(req, res);
  }

  @Post('userConfig/:id')
  userConfig(@Param('id') id: string){
    return this.loginService.userConfig(+id)
  }
}
