import { Controller, Get, Post, Body, Request, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/setMetaData';
import { UserDTO } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(
    @Body() data: SignInDTO
  ) {
    return this.authService.signIn(data);
  }

  @Public()
  @Post('sign-up')
  signUp(
    @Body() data: UserDTO
  ) {
    return this.authService.signUp(data);
  }

  @Get("profile")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req){
    return req.user
  }
}
