import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor (private dbService: PrismaService){}

    /**
     * get all user
     * @returns 
     */
    async findAll (){
        return await this.dbService.user.findMany()
    }

/**
 * 
 * @param data 
 * @returns 
 */

    async createData (data: CreateUserDto) {
        return await this.dbService.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password
            }
        })
    }

    /**
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    async updateData(id:number, data: any){
        return await this.dbService.user.update({
            data,
            where: {
                id
            }
        })
    }

    /**
     * 
     * @param id
     * @returns
     */
    async deleteData(id: number) {
        return await this.dbService.user.delete({
            where:{
                id
            }
        })
    }

}
