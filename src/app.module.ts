import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    CommonModule,
    UserModule,
    ContactModule,
  ],
  controllers: [ContactController],
  providers: [AppService],
})
export class AppModule {}
