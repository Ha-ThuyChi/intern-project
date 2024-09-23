import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './server/app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule, 
    UsersModule,
    EventModule,
    OrganizationModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
