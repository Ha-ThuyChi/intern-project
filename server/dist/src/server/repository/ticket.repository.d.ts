import { PrismaService } from "src/prisma/prisma.service";
import { TicketType } from "../enum";
export declare class TicketRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    createTicket(eventId: number, ticketType: TicketType, name: string, price: number, quantity: number, isVisible: boolean, startDate: Date, endDate: Date): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }>;
    updateTicket(ticketId: number, ticketType: TicketType, name: string, price: number, quantity: number, isVisible: boolean, startDate: Date, endDate: Date): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }>;
    getTicketByEventId(eventId: number): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }[]>;
    getTicketByTicketId(ticketId: number): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }>;
    getTickets(eventId: number, ticketType: TicketType): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }>;
    deleteTicketType(ticketId: number): Promise<{
        id: number;
        ticketType: import(".prisma/client").$Enums.TicketType;
        name: string;
        isVisible: boolean;
        price: number;
        quantity: number;
        startDate: Date;
        endDate: Date;
        eventId: number;
    }>;
}
