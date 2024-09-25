import { Injectable, NotFoundException } from "@nestjs/common";
import { LocationType } from "../enum";
import { Status } from "../auth/dto/sign-up.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EventRepository {
    constructor(private prismaService: PrismaService) {}

    // find one by eventId
    async findOne(eventId: number) {
        const foundEvent = await this.prismaService.event.findUnique({
            where: {
                id: eventId
            }
        });
        return foundEvent;
    };

    // find many by userId
    async findByUserId(userId: number, start: number, limit: number) {
        const skip = (start - 1)*limit;
        // const foundUser = await this.prismaService.user.findUnique({
        //     where: {
        //         id: userId
        //     }
        // });
        // if (!foundUser) {
        //     throw new NotFoundException("User not found.")
        // }
        const [events, total] = await Promise.all([
            await this.prismaService.event.findMany({
                where: {
                    userId: userId
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.event.count({
                where: {
                    userId: userId
                }
            })
        ])
        return {
            list: events,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    };

    // create event
    async createEvent(
        userId: number, 
        organizationId: number,
        name: string, 
        location: string, 
        locationType: LocationType, 
        description: string, 
        image: string, 
        startDate: Date, 
        endDate: Date, 
        status: Status
    ) {
        if (organizationId) {
            const foundOrganization = await this.prismaService.organization.findUnique({
                where: {
                    id: Number(organizationId)
                }
            });
            if (!foundOrganization) {
                throw new NotFoundException("Organization not found.")
            }
        };
        const createdEvent = await this.prismaService.event.create({
            data: {
                name: name,
                locationType: locationType,
                location: location,
                image: image,
                description: description,
                startDate: startDate,
                endDate: endDate,
                status: status,
                organizationId: organizationId,
                userId: userId
            }
        });
        return createdEvent;
    };

    async disableEvent(eventId: number) {
        const updatedEvent = await this.prismaService.event.update({
            data: {
                status: "DISABLE"
            },
            where: {
                id: eventId
            }
        });
        return updatedEvent;
    }

    async getEvents(start: number, limit: number) {
        const skip = (start - 1)*limit;
        const [foundEvents, total] = await Promise.all([
            await this.prismaService.event.findMany({
                where: {
                    status: "ACTIVE"
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.event.count({
                where: {
                    status: "ACTIVE"
                }
            })
        ]) 
        return {
            list: foundEvents,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    }
}