import { PrismaService } from "src/prisma/prisma.service";
import { TicketType } from "../enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketRepository {
    constructor(private prismaService: PrismaService) {}


    // when owner of a event create ticket
    async createTicket (
        eventId: number, 
        ticketType: TicketType,
        name: string,
        price: number, 
        quantity: number,
        isVisible: boolean,
        startDate: Date,
        endDate: Date,
    ) {
        const createdTicket = await this.prismaService.ticket.create({
            data: {
                eventId: eventId,
                ticketType: ticketType,
                name: name,
                price: price,
                quantity: quantity,
                isVisible: isVisible,
                startDate: startDate,
                endDate: endDate
            }
        });
        return createdTicket;
    };

    async updateTicket (
        ticketId: number, 
        ticketType: TicketType,
        name: string,
        price: number, 
        quantity: number,
        isVisible: boolean,
        startDate: Date,
        endDate: Date,
    ) {
        const updatedTicket = await this.prismaService.ticket.update({
            data: {
                ticketType: ticketType,
                name: name,
                price: price,
                quantity: quantity,
                isVisible: isVisible,
                startDate: startDate,
                endDate: endDate
            },
            where: {
                // TODO: Ceck if startDate is valid to modify the ticket
                id: ticketId
            }   
        });
        return updatedTicket;
    };

    async getTicketByEventId(eventId: number) {
        const foundTickets = await this.prismaService.ticket.findMany({
            where: {
                eventId: eventId
            }
        });
        return foundTickets;
    };

    async getTicketByTicketId(ticketId: number) {
        const foundTicket = await this.prismaService.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        return foundTicket;
    };

    // Find tickets by ticketId and ticketType
    async getTickets(eventId: number, ticketType: TicketType) {
        const foundTickets = await this.prismaService.ticket.findFirst({
            where: {
                eventId: eventId,
                ticketType: ticketType,
            }
        });
        return foundTickets;
    }

    async deleteTicket(ticketId: number) {
        // TODO: Check if any ticket is bought
        const deletedTicket = await this.prismaService.ticket.delete({
            where: {
                id: ticketId
            }
        });
        return deletedTicket;
    }

    // Update quantity of ticket
    async updateQuantity(ticketId: number, quantity: number) {
        const updatedTicket = await this.prismaService.ticket.update({
            data: {
                quantity: quantity
            },
            where: {
                id: ticketId
            }
        });
        return updatedTicket;
    }
}