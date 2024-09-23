import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../repository/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserRepository],
  imports: [
    PrismaModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s'}
    })
],
})
export class AuthModule {}