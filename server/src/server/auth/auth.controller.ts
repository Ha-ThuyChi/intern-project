import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UserDTO } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(
    @Body() data: SignInDTO
  ) {
    return this.authService.signIn(data);
  }

  @Post('sign-up')
  signUp(
    @Body() data: UserDTO
  ) {
    return this.authService.signUp(data);
  }
}
