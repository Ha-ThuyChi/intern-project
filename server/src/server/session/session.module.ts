import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { SessionRepository } from "../repository/session.repository";
import { EventRepository } from "../repository/event.repository";

@Module({
    imports: [PrismaModule],
    providers: [SessionService, SessionRepository, EventRepository],
    controllers: [SessionController]
})
export class SessionModule {}