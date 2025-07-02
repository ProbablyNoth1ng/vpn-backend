import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma , User } from '@prisma/client';
@Injectable()
export class RegistrationService {
  constructor (private readonly prisma:PrismaService){}

    async create(data: Prisma.UserCreateInput): Promise<User> {
      console.log('added to bd',data)
      if(typeof data.createdAt === "string"){
        data.createdAt = new Date(data.createdAt)
      }
      return this.prisma.user.create({data});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
