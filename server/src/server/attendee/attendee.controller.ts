import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { AttendeeService } from "./attendee.service";
import { AttendeeDTO } from "./dto/attendee.dto";

@Controller("attendees")
export class AttendeeController {
    constructor (
        private attendeeService: AttendeeService
    ) {}

    @Post(":ticketId/:userId")
    attendEvent(
        @Param("userId") userId: number,
        @Param("ticketId") ticketId: number,
        @Body() data: AttendeeDTO
    ) {
        return this.attendeeService.registerEvent(Number(userId), Number(ticketId), data)
    };

    @Delete(":ticketId/:userId")
    cancelRegistration(
        @Param("userId") userId: number,
        @Param("ticketId") ticketId: number,
        @Body() data: AttendeeDTO
    ) {
        return this.attendeeService.cancelRegistration(Number(userId), Number(ticketId), data);
    }
}