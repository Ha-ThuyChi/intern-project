import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":userId")
  getUserInfo(
    @Param("userId") userId: number
  ) {
    return this.usersService.findOne(Number(userId));
  }
}
