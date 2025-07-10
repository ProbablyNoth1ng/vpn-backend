import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()

export class LoginService {
   constructor(private readonly prisma: PrismaService) {}

  async login( res:any, createLoginDto: CreateLoginDto) {
   

    const user = await this.prisma.user.findFirst({
      where: { email: createLoginDto.email },
    });
    

    let token = btoa([user?.id,user?.email,user?.password].toString())
    console.log(token)


    if(user?.isVerified) {
      res.cookie('auth_token',token,{
        httpOnly: true,       
        secure: false,        
        sameSite: 'strict',   
        maxAge: 1000 * 60 * 60 * 2, 
      })
      return { message: 'Logged in' };

    } else if(!user?.isVerified) {

      console.log("user not verified");

    } else {

      console.log("user not exist")
    }
        
  }

  async logout(req:any, res:any){
      const token = req.cookies['auth_token']

      console.log(token)
      if(token){
        res.clearCookie('auth_token', {
        httpOnly: true,
        secure: false,    
        sameSite: 'strict',
      });

      return { message: 'Logged out' };
      }

      return {message: 'cookies not exist'}
  }

}
