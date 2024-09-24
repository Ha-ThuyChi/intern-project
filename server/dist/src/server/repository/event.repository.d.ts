import { Status } from "../auth/dto/sign-up.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class EventRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    findOne(eventId: number): Promise<{
        id: number;
        name: string;
        locationType: import(".prisma/client").$Enums.LocationType;
        location: string;
        image: string | null;
        description: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.Status;
        userId: number;
        organizationId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByUserId(userId: number, start: number, limit: number): Promise<{
        list: {
            id: number;
            name: string;
            locationType: import(".prisma/client").$Enums.LocationType;
            location: string;
            image: string | null;
            description: string;
            startDate: Date;
            endDate: Date;
            status: import(".prisma/client").$Enums.Status;
            userId: number;
            organizationId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        limit: number;
        page: number;
        maxPage: number;
    }>;
    createEvent(userId: number, organizationId: number, name: string, location: string, description: string, image: string, startDate: Date, endDate: Date, status: Status): Promise<{
        id: number;
        name: string;
        locationType: import(".prisma/client").$Enums.LocationType;
        location: string;
        image: string | null;
        description: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.Status;
        userId: number;
        organizationId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    disableEvent(eventId: number): Promise<{
        id: number;
        name: string;
        locationType: import(".prisma/client").$Enums.LocationType;
        location: string;
        image: string | null;
        description: string;
        startDate: Date;
        endDate: Date;
        status: import(".prisma/client").$Enums.Status;
        userId: number;
        organizationId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
