import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventService } from './event.service';
import { EventRepository } from 'src/server/repository/event.repository';
import { EventController } from './event.controller';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, EventRepository, UserRepository],
})
export class EventModule {}
