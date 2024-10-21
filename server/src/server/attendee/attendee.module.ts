import { Module } from "@nestjs/common";
import { BlogRepository } from "../repository/blog.repository";
import { PrismaModule } from "src/prisma/prisma.module";
import { AttendeeController } from "./attendee.controller";
import { AttendeeService } from "./attendee.service";
import { AttendeeRepository } from "../repository/attendee.repository";
import { TicketRepository } from "../repository/ticket.repository";

@Module({
    imports: [PrismaModule],
    providers: [AttendeeService, AttendeeRepository, TicketRepository,],
    controllers: [AttendeeController]
})

export class AttendeeModule {};