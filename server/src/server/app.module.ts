import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { OrganizationModule } from './organization/organization.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule, 
    UsersModule,
    EventModule,
    OrganizationModule,
    SessionModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
