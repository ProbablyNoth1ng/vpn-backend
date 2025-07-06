import { Controller, Get, Res, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @Post('')
  login(@Res({ passthrough: true }) res, @Body() createLoginDto: CreateLoginDto) {
    return this.loginService.login(res, createLoginDto);
  }

  @Post('out')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    return this.loginService.logout(req,res);
  }

}
