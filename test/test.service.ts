import { PrismaService } from "../src/common/prisma.service";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";

@Injectable()
export class TestService {
    constructor ( private testService: PrismaService){
    }

    async deleteUser() {
        await this.testService.user.deleteMany({
            where:{
                username: 'test'
            }
        })
    }

    async getUser(): Promise<User | null> {
        return this.testService.user.findUnique({
            where: {
                username: 'test'
            },
        });
    }
    async createUser() {
        await this.testService.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await bcrypt.hash('test', 10),
            }
        })
    }
}