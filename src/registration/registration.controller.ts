import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto, User } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { VerifyEmailDto } from 'src/registration/dto/verify-email.dto';
import { Prisma } from '@prisma/client';
import { ApiResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';


@Controller('/registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @ApiOperation({summary:"Create user"})
  @ApiCreatedResponse({
    description:"user created",
    type:User,
  })
  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }

  @ApiOperation({summary:"Verify user"})
  @ApiCreatedResponse({
    description:"user verified",
    type:User,
  })
  @Post('/verify')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.registrationService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.code,
    );
  }

  @ApiOperation({summary:"Find all users in db"})
  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @ApiOperation({summary:"Find user from db by email"})
  @ApiCreatedResponse({
    description:"user was found",
    type:User,
  })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.registrationService.findOne(email);
  }

  @ApiOperation({summary:"update user info"})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return this.registrationService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
