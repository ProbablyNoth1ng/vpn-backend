import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const UserIp =  createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {

      return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || '';
  },
);
