import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { PaginationDTO } from 'src/server/pagination.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    getEventByEventId(eventId: number): Promise<{
        success: boolean;
        message: {
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
        };
    }>;
    getEventsByUserId(userId: number, data: PaginationDTO): Promise<{
        success: boolean;
        message: {
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
        };
    }>;
    createEvent(userId: number, data: EventDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    disableEvent(eventId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
