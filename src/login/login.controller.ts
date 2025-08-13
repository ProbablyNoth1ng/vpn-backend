import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, LoginConfigPath } from './dto/create-login.dto';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/login/authguard/auth.guard';
import { UserIp } from 'src/clientIP/user-ip.decorator';
import * as fs from 'fs';
import * as path from 'path';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({
    description: 'Logged in',
    type: LoginConfigPath,
  })
  @Post('')
  async login(
    @UserIp() ip: string,
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
  @Post('out')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    return this.loginService.logout(req, res);
  }

  @UseGuards(AuthGuard)
  @Get('config')
  async getConfig(@Req() req, @Res() res) {
    const userId = req.user.id;

    const filePath = path.join(
      process.cwd(),
      'configs',
      `client-${userId}.conf`,
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="client-${userId}.conf"`,
    );
    fs.createReadStream(filePath).pipe(res);
  }
}
