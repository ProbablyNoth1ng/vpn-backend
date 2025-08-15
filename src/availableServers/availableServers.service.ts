import { Injectable, Ip } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, ServersList } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AvailableServersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

    async addServer(data: Prisma.ServersListCreateInput){
        const existingServer = await this.prisma.serversList.findFirst({
          where: { ip: data.ip },
        });

        if(!existingServer){
          const server = await this.prisma.serversList.create({
            data: {
              ...data,
            },
          });

        } else {
          return `Server with IP ${data.ip} exist`
        }

  
      return "Server added"
    }
    async geAllServers() {
      return this.prisma.serversList.findMany();
    }
    async getCertainServer(ip: string) {
      return this.prisma.serversList.findFirst({ where: { ip } });
    }

}
