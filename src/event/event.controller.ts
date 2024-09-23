import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { PaginationDTO } from 'src/pagination.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(":eventId")
  getEventByEventId(
    @Param("eventId") eventId: number
  ) {
    return this.eventService.findOne(Number(eventId));
  };

  @Get(":userId")
  getEventsByUserId(
    @Param("userId") userId: number,
    @Body() data: PaginationDTO
  ) {
    return this.eventService.findByUserId(Number(userId), Number(data.page), Number(data.limit));
  }

  @Post("event/:userId")
  createEvent(
    @Param("userId") userId: number,
    @Body() data: EventDTO
  ) {
    return this.eventService.createEvent(Number(userId), data);
  }

  @Patch(":eventId/disbale-event")
  disableEvent(
    @Param("eventId") eventId: number,
  ) {
    return this.eventService.disableEvent(Number(eventId));
  }
}
