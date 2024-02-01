import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
