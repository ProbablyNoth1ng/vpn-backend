import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as dayjs from 'dayjs';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateSession } from './update-session.dto';
import axios from 'axios';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: number, token: string, req: Request) {
     return this.prisma.userSession.create({
      data: {
        userId,
        token,
        ipAddress: req.ip ?? 'unknown',
        userAgent: req.headers['user-agent'] ?? null,
        expiresAt: dayjs().add(2, 'hour').toDate(),
        oneTimeConfiguration: null
      },
    });
  }

  async deactivateSession(token: string) {
    return this.prisma.userSession.updateMany({
      where: { token, isActive: true },
      data: { isActive: false },
    });
  }

  async getActiveSessions(userId: number) {
    return this.prisma.userSession.findMany({
      where: {
        userId,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async cleanExpiredSessions() {
    return this.prisma.userSession.deleteMany({
      where: {
        OR: [{ isActive: false }, { expiresAt: { lt: new Date() } }],
      },
    });
  }

  async updateOnetimeConfiguration(req, configurationToken:UpdateSession) {
    let country = ''
    try{
      const res = await axios.get(`http://ip-api.com/json/${configurationToken.serverIp}`);
      country = res.data?.country
    } catch {
      console.log('not found country')
    }

    const conftoken = `${country}:${configurationToken.serverIp}:${configurationToken.port}:${configurationToken.username}:${configurationToken.password}`

    

     
    return this.prisma.userSession.update({
      where: {
        token: req.cookies["auth_token"]
      },
      data:{
        oneTimeConfiguration: conftoken
      }
    })
  }
}
