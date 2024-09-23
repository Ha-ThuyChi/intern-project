import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

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
    @Body() data: SignUpDTO
  ) {
    return this.authService.signUp(data);
  }
}
