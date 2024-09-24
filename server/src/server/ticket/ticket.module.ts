import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TicketService } from "./ticket.service";
import { TicketRepository } from "../repository/ticket.repository";
import { TicketController } from "./ticket.controller";
import { EventRepository } from "../repository/event.repository";

@Module({
    imports: [PrismaModule],
    providers: [TicketService, TicketRepository, EventRepository],
    controllers: [TicketController]
})
export class TicketModule {};