import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma , User } from '@prisma/client';
@Injectable()
export class RegistrationService {
  constructor (private readonly prisma:PrismaService){}

    async create(data: Prisma.UserCreateInput) {
      let checkDuplicate = await this.prisma.user.findFirst({where: { email: data.email } });

      if(checkDuplicate === null) {
        if(typeof data.createdAt === "string"){
          data.createdAt = new Date(data.createdAt)
        }
        console.log('added to bd',data)
        return this.prisma.user.create({data});
      }
      console.log('DUPLICATE')
      return null;
 
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where:{id}});
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
