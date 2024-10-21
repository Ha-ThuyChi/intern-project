import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { SessionRepository } from "src/server/repository/session.repository";
import { SessionDTO } from "./dto/session.dto";
import { PaginationDTO } from "src/server/pagination.dto";
import { EventRepository } from "../repository/event.repository";

@Injectable()
export class SessionService {
    constructor(
        private sessionRepository: SessionRepository,
        private eventRepository: EventRepository
    ) {}

    async createSession(eventId: number, data: SessionDTO) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new NotFoundException("Event does not exist.")
        };
        const createdSession = await this.sessionRepository.createsession(
            eventId,
            data.name,
            data.description,
            data.startDate,
            data.endDate,
            data.hostName,
        );

        if (!createdSession) {
            throw new NotAcceptableException("Cannot create new session.")
        };
        return {success: true, message: "Session is created."}
    };

    async findOne(sessionId: number) {
        const foundSession = await this.sessionRepository.findOne(sessionId);

        if (!foundSession) {
            throw new NotFoundException("Session not found.")
        };
        return {success: true, message: foundSession};
    };

    async findManyByEventId(eventId: number, page: number, limit: number) {
        const foundSessions = await this.sessionRepository.findManyByEventId(eventId, page, limit)

        if (!foundSessions) {
            throw new NotFoundException("Sessions not found.")
        };
        return {success: true, message: foundSessions};
    };

    async updateSession(sessionId: number, data: SessionDTO) {
        const updatedSession = await this.sessionRepository.updateSession(
            sessionId, 
            data.name, 
            data.description, 
            data.startDate, 
            data.endDate,
            data.hostName
        );
        if (!updatedSession) {
            throw new NotFoundException("Cannot updated session.")
        };
        return {success: true, message: "Session is updated."};
    };
    
    async deletedSession(sessionId: number) {
        const deletedSession = await this.sessionRepository.deleteSession(sessionId);
        if (!deletedSession) {
            throw new NotFoundException("Cannot delete session.")
        };
        return {success: true, message: "Session is deleted."};
    };
}