import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":userId")
  getUserInfo(
    @Param("userId") userId: number
  ) {
    return this.usersService.findOne(Number(userId));
  };

  @Patch("/disable-account/:userId")
  disableAccount(
    @Param("userId") userId: number
  ) {
    return this.usersService.disableAccount(Number(userId))
  };

  @Patch("/edit-account/:userId")
  editAccount(
    @Param("userId") userId: number,
    @Body() data: UserDTO
  ) {
    return this.usersService.editAccount(Number(userId), data)
  }
}
