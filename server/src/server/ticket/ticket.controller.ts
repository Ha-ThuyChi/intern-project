import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketDTO } from "./dto/ticket.dto";

@Controller("tickets")
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Post("ticket/:eventId")
    createTicket(
        @Param("eventId") eventId: number,
        @Body() data: TicketDTO
    ) {
        return this.ticketService.createTicket(Number(eventId), data);
    };

    @Patch("ticket/:ticketId")
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

    @Get("ticket/:ticketId") 
    getTicketByTicketId(
        @Param("ticketId") ticketId: number
    ) {
        return this.ticketService.getTicketByTicketId(Number(ticketId));
    };

    @Delete(":ticketId")
    deleteTicket(
        @Param("ticketId") ticketId: number
    ) {
        return this.ticketService.deleteTicket(Number(ticketId));
    }
}