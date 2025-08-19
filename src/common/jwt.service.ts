import { Injectable } from "@nestjs/common";
import {  JwtService as NestJwtService} from "@nestjs/jwt";
import { User } from '@prisma/client'

@Injectable()
export class JwtService {
  constructor ( private jwtService : NestJwtService) {}

  // generate token dlu

  generateToken(user: User){
    const payload = {
      username : user.username,
      name : user.name
    };

    return this.jwtService.sign(payload)
  }

  // verifikasi token
  verifyToken ( token: string) {
    try {
      return this.jwtService.verify(token);
    }catch (error) {
      return null;
    }
  }

  // decode token payload!
  decodeToken (token:string ){
    try{
      return this.jwtService.decode(token)
    }catch (error){
      return null
    }
  }
}