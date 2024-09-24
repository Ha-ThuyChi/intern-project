import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketDTO } from "./dto/ticket.dto";

@Controller("tickets")
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Post(":eventId/ticket")
    createTicket(
        @Param("eventId") eventId: number,
        @Body() data: TicketDTO
    ) {
        return this.ticketService.createTicket(Number(eventId), data);
    };

    @Patch(":ticketId/ticket")
    updateTicket(
        @Param("ticketId") ticketId: number,
        @Body() data: TicketDTO
    ) {
        return this.ticketService.updateTicket(Number(ticketId), data);
    };

    @Get(":eventId") 
    getTicketByEventId(
        @Param("eventId") eventId: number
    ) {
        return this.ticketService.getTicketByEventId(Number(eventId));
    };

    @Get(":ticketId") 
    getTicketByTicketId(
        @Param("ticketId") ticketId: number
    ) {
        return this.ticketService.getTicketByEventId(Number(ticketId));
    };
}