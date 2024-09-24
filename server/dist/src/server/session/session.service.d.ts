import { SessionRepository } from "src/server/repository/session.repository";
import { SessionDTO } from "./dto/session.dto";
export declare class SessionService {
    private sessionRepository;
    constructor(sessionRepository: SessionRepository);
    createSession(eventId: number, data: SessionDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(sessionId: number): Promise<{
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
    findManyByEventId(eventId: number, page: number, limit: number): Promise<{
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
    deletedSession(sessionId: number): Promise<{
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
