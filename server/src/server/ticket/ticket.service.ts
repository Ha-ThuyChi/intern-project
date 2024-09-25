import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { TicketRepository } from "../repository/ticket.repository";
import { EventRepository } from "../repository/event.repository";
import { TicketDTO } from "./dto/ticket.dto";

@Injectable()
export class TicketService {
    constructor(
        private ticketRepository: TicketRepository,
        private eventRepository: EventRepository
    ) {}

    async createTicket(eventId: number, data: TicketDTO) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new NotFoundException("Event does not exist.");
        };
        const foundTickets = await this.ticketRepository.getTickets(eventId, data.ticketType);

        // Validate the price
        if (data.ticketType === "FREE" || data.ticketType === "DONATION") {
            if (data.price !== 0) {
                throw new NotAcceptableException("Invalid price.")
            }
        }

        let createdTicket;
        if (foundTickets) {
            // Validate the end date
            if (foundTickets.endDate <= new Date()) {
                throw new NotAcceptableException("Cannot create more ticket because the selling is over.")
            }
            // If the ticket type exists
            createdTicket = await this.ticketRepository.updateQuantity(foundTickets.id, foundTickets.quantity+data.quantity)
        } else {
            // If ticket type not exist
            createdTicket = await this.ticketRepository.createTicket(
                eventId,
                data.ticketType,
                data.name,
                data.price,
                data.quantity,
                data.isVisible,
                data.startDate,
                data.endDate
            );
        }
        

        if (!createdTicket) {
            return({success: false, message: "Ticket is not created."})
        }
        return({success: true, message: "Ticket is created."})
    };

    async updateTicket(ticketId: number, data: TicketDTO) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new NotFoundException("Ticket does not exist.")
        };

        // const foundTickets = await this.ticketRepository.getTickets(foundTicket.eventId, data.ticketType);

        // Validate the price
        if (data.ticketType === "FREE" || data.ticketType === "DONATION") {
            if (data.price !== 0) {
                throw new NotAcceptableException("Invalid price.")
            }
        }

        // let updatedTicket;
        // if (foundTickets) {
        //     // Validate the end date
        //     if (foundTickets.endDate <= new Date()) {
        //         throw new NotAcceptableException("Cannot create more ticket because the selling is over.")
        //     };
        //     updatedTicket = await this.ticketRepository.updateQuantity(foundTickets.id, foundTickets.quantity+data.quantity);
        //     await this.ticketRepository.deleteTicket(foundTicket.id);
        // } else {
        //     updatedTicket = await this.ticketRepository.updateTicket(
        //         ticketId,
        //         data.ticketType,
        //         data.name,
        //         data.price,
        //         data.quantity,
        //         data.isVisible,
        //         data.startDate,
        //         data.endDate
        //     );
        // }
        const updatedTicket = await this.ticketRepository.updateTicket(
            ticketId,
            data.ticketType,
            data.name,
            data.price,
            data.quantity,
            data.isVisible,
            data.startDate,
            data.endDate
        );
        if (!updatedTicket) {
            return({success: false, message: "Ticket is not updated."})
        }
        return({success: true, message: "Ticket is updated."})
    };

    async getTicketByEventId(eventId: number) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new NotFoundException("Event does not exist.");
        };

        const foundTickets = await this.ticketRepository.getTicketByEventId(eventId);
        if (!foundTickets) {
            return({success: false, message: "No ticket to display."})
        }
        return({success: true, message: foundTickets});
    };

    async getTicketByTicketId(ticketId: number) {

        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            return({success: false, message: "No ticket to display."})
        }
        return({success: true, message: foundTicket});
    };

    async deleteTicket(ticketId: number) {

        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new NotFoundException("Ticket not found.")
        }

        if (foundTicket.startDate > new Date()) {
            throw new NotAcceptableException("Ticket is being selling now. Cannot delete ticket.")
        };

        const deletedTicket = await this.ticketRepository.deleteTicket(ticketId);

        if (!deletedTicket) {
            return({success: false, message: "Ticket is not deleted."})
        };

        return ({success: true, message: "Ticket is deleted."})
    }
}
