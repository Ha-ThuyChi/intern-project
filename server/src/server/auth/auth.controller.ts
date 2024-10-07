import { Controller, Get, Post, Body, Request, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthGuardApp } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/setMetaData';
import { UserDTO } from '../users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
  @UseGuards(AuthGuardApp)
  @ApiBearerAuth()
  getProfile(@Request() req){
    return req.user
  }

  // @Public()
  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  // @Public()
  // @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.authService.googleLogin(req)
  // }

  @Public()
  @Post('/google/sign-up')
  async signUpViaGoogle(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // log the ticket payload in the console to see what we have
    const { email, given_name, family_name, picture } = ticket.getPayload();
    
  };

  @Public()
  @Post('/google/sign-in')
  async loginViaGoogle(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // log the ticket payload in the console to see what we have
    const { email } = ticket.getPayload();
    return this.authService.signInViaGoogle(email);
  };

  @Public()
  @Post("/otp/sign-in/:email")
  signInOTP(
    @Param("email") email: string
  ) {
    return this.authService.sendOTP(email);
  };

  @Public()
  @Post("/verify-otp/sign-in/:email")
  verifySignInOTP(
    @Param("email") email: string
  ) {
    return this.authService.sendOTP(email);
  }
}
