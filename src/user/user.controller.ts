import { Body, Controller, Get, Post, Param, Patch, UsePipes, ValidationPipe, ParseIntPipe, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    /**
     * Get All User
     * @returns
     */

    @Get()
    async users () {
        return await this.UserService.findAll();
    }

    /**
     * Create User Baru
     * @param body
     * @returns
     */

    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    @Post()
    async createUser (@Body() body : CreateUserDto) {
        return await this.UserService.createData(body);
    }

    /**
     * Update User
     * @param id
     * @param body
     * @returns
     */
    @UsePipes(ValidationPipe) // harus di parsing karena dari int ke string bisa error
    @Patch('/:id')
    async updateUser(@Param('id', ParseIntPipe) id, @Body() body ) {
        return await this.UserService.updateData(id, body);
    }

    /**
     *
     * @param id
     * @returns
     */
    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id) {
        return await this.UserService.deleteData(id);
    }
}
