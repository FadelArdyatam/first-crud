import { SignOptions } from './../../node_modules/@nestjs/jwt/node_modules/@types/jsonwebtoken/index.d';
import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

const jwtConstant = {
  secret: 'SECRETTT ABISS DAH'
}

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || jwtConstant.secret,
      signOptions: { expiresIn: '60m'}
    })
  ],

  providers: [
    PrismaService,
    ValidationService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [PrismaService, ValidationService, JwtService],
})
export class CommonModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*')
  }
}
