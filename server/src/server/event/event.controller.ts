import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { PaginationDTO } from 'src/server/pagination.dto';
import { Public } from 'src/setMetaData';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Public()
  @Get("find-event/:eventId")
  getEventByEventId(
    @Param("eventId") eventId: number
  ) {
    return this.eventService.findByEventId(Number(eventId));
  };

  @Get(":userId")
  getEventsByUserId(
    @Param("userId") userId: number,
    @Query() data: PaginationDTO
  ) {
    return this.eventService.findByUserId(Number(userId), Number(data.page), Number(data.limit));
  }

  @Public()
  @Get("")
  getEvents(
    @Query() data: PaginationDTO
  ) {
    return this.eventService.getAllEvents(Number(data.page), Number(data.limit));
  }

  @Post("event/:userId")
  @ApiBearerAuth()
  createEvent(
    @Param("userId") userId: number,
    @Body() data: EventDTO
  ) {
    return this.eventService.createEvent(Number(userId), data);
  };

  @Patch("disable-event/:eventId")
  disableEvent(
    @Param("eventId") eventId: number,
  ) {
    return this.eventService.disableEvent(Number(eventId));
  };

  @Get("for-you/:userId")
  getForYouEvents(
    @Param("userId") userId: number
  ) {
    return this.eventService.getForYouEvents(Number(userId));
  };

  @Patch("event/:eventId")
  editEvent(
    @Body() data: EventDTO,
    @Param("eventId") eventId: number
  ) {
    return this.eventService.editEvent(Number(eventId), data);
  };

  @Patch("able-event/:eventId")
  ableEvent(
    @Param("eventId") eventId: number,
  ) {
    return this.eventService.ableEvent(Number(eventId));
  };
}
