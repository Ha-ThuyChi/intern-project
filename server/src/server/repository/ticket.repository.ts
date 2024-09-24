import { PrismaService } from "src/prisma/prisma.service";
import { TicketType } from "../enum";

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

    async deleteTicketType(ticketId: number) {
        // TODO: Check if any ticket is bought
        const deletedTicket = await this.prismaService.ticket.delete({
            where: {
                id: ticketId
            }
        });
        return deletedTicket;
    }
}