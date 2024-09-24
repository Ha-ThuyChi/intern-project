import { EventRepository } from 'src/server/repository/event.repository';
import { EventDTO } from './dto/event.dto';
import { UserRepository } from '../repository/user.repository';
export declare class EventService {
    private eventRepository;
    private userRepository;
    constructor(eventRepository: EventRepository, userRepository: UserRepository);
    findOne(eventId: number): Promise<{
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
    findByUserId(userId: number, skip: number, limit: number): Promise<{
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
