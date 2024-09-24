import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { SessionRepository } from "../repository/session.repository";

@Module({
    imports: [PrismaModule],
    providers: [SessionService, SessionRepository],
    controllers: [SessionController]
})
export class SessionModule {}