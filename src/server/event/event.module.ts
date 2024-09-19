import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventService } from './event.service';
import { EventRepository } from 'src/repository/event.repository';
import { EventController } from './event.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
