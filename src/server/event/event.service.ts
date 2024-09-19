import { BadRequestException, ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { EventRepository } from 'src/repository/event.repository';
import { EventDTO } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async findOne(eventId: number) {
    const foundEvent = await this.eventRepository.findOne(eventId);
    if (!foundEvent) {
      throw new NotAcceptableException("Event does not exist.")
    };
    return {success: true, message: foundEvent};
  };

  async findByUserId(userId: number, skip: number, limit: number) {
    const foundEvents = await this.eventRepository.findByUserId(userId, skip, limit);
    if (!foundEvents) {
        throw new NotFoundException("Event not found.")
    };
    return {success: true, message: foundEvents}
  };

  async createEvent(userId: number, data: EventDTO) {
    const createdEvent = await this.eventRepository.createEvent(
      userId, 
      data.organizationId, 
      data.name, 
      data.location, 
      // data.locationType, 
      data.description, 
      data.image, 
      new Date(data.startDate), 
      new Date(data.endDate), 
      data.status
    );
    if (createdEvent) {
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
  }
}
