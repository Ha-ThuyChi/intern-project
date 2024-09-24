import { SessionDTO } from "./dto/session.dto";
import { SessionService } from "./session.service";
import { PaginationDTO } from "src/server/pagination.dto";
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    createSession(eventId: number, data: SessionDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    getSessionBySessiontId(sessionId: number): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string | null;
            startDate: Date;
            endDate: Date;
            hostName: string | null;
            eventId: number;
        };
    }>;
    getSessionByUserId(eventId: number, data: PaginationDTO): Promise<{
        success: boolean;
        message: {
            list: {
                id: number;
                name: string;
                description: string | null;
                startDate: Date;
                endDate: Date;
                hostName: string | null;
                eventId: number;
            }[];
            total: number;
            limit: number;
            page: number;
            maxPage: number;
        };
    }>;
    updateSession(sessionId: number, data: SessionDTO): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string | null;
            startDate: Date;
            endDate: Date;
            hostName: string | null;
            eventId: number;
        };
    }>;
    deletesession(sessionId: number): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string | null;
            startDate: Date;
            endDate: Date;
            hostName: string | null;
            eventId: number;
        };
    }>;
}
