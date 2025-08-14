import { PrismaService } from "../src/common/prisma.service";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

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

    async createUser() {
        await this.testService.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await bcrypt.hash('test', 10)
            }
        })
    }
}