import { BadRequestException, ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { EventRepository } from 'src/server/repository/event.repository';
import { EventDTO } from './dto/event.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository
  ) {}

  async findByEventId(eventId: number) {
    const foundEvent = await this.eventRepository.findOne(eventId);
    if (!foundEvent) {
      throw new NotAcceptableException("Event does not exist.")
    };
    return {success: true, message: foundEvent};
  };

  async findByUserId(userId: number, skip: number, limit: number) {
    const foundEvents = await this.eventRepository.findByUserId(userId, skip, limit);
    if (foundEvents.total === 0) {
      throw new NotFoundException("No event is found.")
    };
    return {success: true, message: foundEvents};
  };

  async createEvent(userId: number, data: EventDTO) {
    const createdEvent = await this.eventRepository.createEvent(
      userId,
      data.organizationId,
      data.name,
      data.city,
      data.country,
      data.platform,
      data.link,
      data.locationType,
      data.description,
      data.image,
      data.startDate,
      data.endDate,
      data.status,
      data.theme, 
      data.timeZone,
      data.isPublic,
      data.isRequireApproval,
      data.isWaitlist

    );
    if (!createdEvent) {
      throw new NotAcceptableException("Cannot create a new event.");
    };
    return {success: true, message: "A new event is created."}
  };

  async disableEvent(eventId: number) {
    const updatedEvent = await this.eventRepository.disableEvent(eventId);
    if (!updatedEvent) {
      throw new NotAcceptableException("Cannot disable event.")
    }
    return {success: true, message: "Event is updated."}
  };

  async getAllEvents(start: number, limit: number) {
    const foundEvents = await this.eventRepository.getAllEvents(start, limit);
    return ({success: true, message: foundEvents});
  };

  async getForYouEvents(userId: number) {
    const foundEvents = await this.eventRepository.getForYouEvents(userId);
    return {success: true, message: foundEvents};
  }
}
