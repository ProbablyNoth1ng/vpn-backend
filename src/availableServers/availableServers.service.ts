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
        const existingServer = await this.prisma.client.serversList.findFirst({
          where: { ip: data.ip },
        });

        if(!existingServer){
          const server = await this.prisma.client.serversList.create({
            data: {
              ...data,
            },
          });

        } else {
          return `Server with IP ${data.ip} exist`
        }

  
      return "Server added"
    }
    async getAllServers() {
      return this.prisma.client.serversList.findMany();
    }
    async getCertainServer(ip: string) {
      return this.prisma.client.serversList.findFirst({ where: { ip } });
    }

}
