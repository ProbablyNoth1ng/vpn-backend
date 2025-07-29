import { Controller, Get, Res, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, LoginConfigPath } from './dto/create-login.dto';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';



@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {}

  @ApiOperation({summary:"Login user"})
  @ApiCreatedResponse({
      description:"Logged in",
      type:LoginConfigPath
  })
  @Post('')
  login(@Res({ passthrough: true }) res, @Body() createLoginDto: CreateLoginDto) {
    return this.loginService.login(res, createLoginDto);
  }

  @ApiOperation({summary:"Logout user"})
  @ApiCreatedResponse({
      description:"Logged out",
  })
  @Post('out')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    return this.loginService.logout(req,res);
  }

}
