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

import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UpdateSession } from './update-session.dto';
import { SessionService } from './session.service';

@Controller('')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({ summary: 'Update Session one time configuration' })
  @ApiCreatedResponse({
    description: 'Update',
    type: UpdateSession,
  })
  @Patch('/updateOneTimeConfiguration')
  async OnetimeConfiguration(
    
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() UpdateSession: UpdateSession,
  ) {
    return this.sessionService.updateOnetimeConfiguration(req, UpdateSession);
  }

}
