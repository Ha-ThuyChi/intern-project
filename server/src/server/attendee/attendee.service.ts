import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { AttendeeRepository } from "../repository/attendee.repository";
import { TicketRepository } from "../repository/ticket.repository";
import { AttendeeDTO } from "./dto/attendee.dto";

@Injectable()
export class AttendeeService {
    constructor (
        private attendeeRepository: AttendeeRepository,
        private ticketRepository: TicketRepository
    ) {}

    async registerEvent(
        userId: number,
        ticketId: number,
        data: AttendeeDTO
    ) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new NotFoundException("Ticket is not existed.")
        };

        
        const foundAttendee = await this.attendeeRepository.findAttendee(userId, ticketId);
        if (foundAttendee) {
            throw new BadRequestException("User registered this event. Cannot register again.")
        };

        const createdAttendance = await this.attendeeRepository.registerEvent(userId, ticketId, data.email);
        if (!createdAttendance) {
            throw new InternalServerErrorException("Cannot attend this event.")
        };
        return {status: true, message: "Attend event successfully."}
    };

    async cancelRegistration(
        userId: number,
        ticketId: number,
        data: AttendeeDTO
    ) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new NotFoundException("Ticket is not existed.")
        };

        const createdAttendance = await this.attendeeRepository.cancelRegistration(userId, ticketId, data.email);
        if (!createdAttendance) {
            throw new InternalServerErrorException("Cannot cancel this registeration.")
        };
        return {status: true, message: "Cancel this registeration successfully."}
    }
}