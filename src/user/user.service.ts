import { HttpException, Inject, Injectable } from '@nestjs/common';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
import {Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        private validationService : ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService : PrismaService
    ) {}


    async register(request: RegisterUserRequest): Promise<UserResponse>{
        this.logger.info(`Register new user ${JSON.stringify(request)}`);
        const registerRequest : RegisterUserRequest =
            this.validationService.validate(UserValidation.REGISTER, request) as RegisterUserRequest;

        const totalUserWithSameUsername = await this.prismaService.user.count({
            where:{
                username: registerRequest.username
            }
        })

        if (totalUserWithSameUsername !== 0 ){
            throw new HttpException(`Username ${registerRequest.username} already exists`, 400);
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await this.prismaService.user.create({
            data: registerRequest
        })

        this.logger.info(`User ${user.username} registered successfully`);

        return {
            username: user.username,
            name: user.name
        }
    }
}