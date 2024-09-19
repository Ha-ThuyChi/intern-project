import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/server/prisma/prisma.module';
import { EventService } from './event.service';
import { EventRepository } from 'src/server/repository/event.repository';
import { EventController } from './event.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
