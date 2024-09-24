import { TicketRepository } from "../repository/ticket.repository";
import { EventRepository } from "../repository/event.repository";
import { TicketDTO } from "./dto/ticket.dto";
export declare class TicketService {
    private ticketRepository;
    private eventRepository;
    constructor(ticketRepository: TicketRepository, eventRepository: EventRepository);
    createTicket(eventId: number, data: TicketDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    updateTicket(ticketId: number, data: TicketDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    getTicketByEventId(eventId: number): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: {
            id: number;
            ticketType: import(".prisma/client").$Enums.TicketType;
            name: string;
            isVisible: boolean;
            price: number;
            quantity: number;
            startDate: Date;
            endDate: Date;
            eventId: number;
        }[];
    }>;
    getTicketByTicketId(ticketId: number): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: {
            id: number;
            ticketType: import(".prisma/client").$Enums.TicketType;
            name: string;
            isVisible: boolean;
            price: number;
            quantity: number;
            startDate: Date;
            endDate: Date;
            eventId: number;
        };
    }>;
    deleteTicket(ticketId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
