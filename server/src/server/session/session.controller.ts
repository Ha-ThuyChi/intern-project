import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SessionDTO } from "./dto/session.dto";
import { SessionService } from "./session.service";
import { PaginationDTO } from "src/server/pagination.dto";

@Controller("sessions")
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}
    
    @Post(":eventId")
    createSession(
        @Param("eventId") eventId: number,
        @Body() data: SessionDTO
    ) {
        return this.sessionService.createSession(Number(eventId), data)
    };

    @Get(":sessionId")
    getSessionBySessiontId(
        @Param("sessionId") sessionId: number
    ) {
        return this.sessionService.findOne(Number(sessionId));
    };

    @Get("session/:eventId")
    getSessionByUserId(
        @Param("eventId") eventId: number,
        @Query() data: PaginationDTO
    ) {
        return this.sessionService.findManyByEventId(Number(eventId), Number(data.page), Number(data.limit));
    };

    @Patch(":sessionId")
    updateSession(
        @Param("sessionId") sessionId: number,
        @Body() data: SessionDTO
    ) {
        return this.sessionService.updateSession(Number(sessionId), data);
    };
    
    @Delete(":sessionId")
    deletesession(
        @Param("sessionId") sessionId: number,
    ) {
        return this.sessionService.deletedSession(Number(sessionId));
    };
}