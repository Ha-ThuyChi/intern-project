import { PrismaService } from "src/prisma/prisma.service";
export declare class SessionRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    createsession(eventId: number, name: string, description: string, startDate: Date, endDate: Date, hostName: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        hostName: string | null;
        eventId: number;
    }>;
    findOne(sessionId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        hostName: string | null;
        eventId: number;
    }>;
    findManyByEventId(eventId: number, start: number, limit: number): Promise<{
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
    }>;
    updateSession(sessionId: number, name: string, description: string, startDate: Date, endDate: Date, hostName: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        hostName: string | null;
        eventId: number;
    }>;
    deleteSession(sessionId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        hostName: string | null;
        eventId: number;
    }>;
}
