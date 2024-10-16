import { Injectable, NotFoundException } from "@nestjs/common";
import { LocationType, Theme } from "../enum";
import { Status } from "../auth/dto/sign-up.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EventRepository {
    constructor(private prismaService: PrismaService) {}

    // find one by eventId
    async findOne(eventId: number) {
        const foundEvent = await this.prismaService.event.findUnique({
            where: {
                id: eventId,
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
                    userId: userId,
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
        city: string,
        country: string,
        platform: string,
        link: string,
        locationType: LocationType, 
        description: string, 
        startDate: Date, 
        endDate: Date, 
        status: Status,
        theme: Theme,
        isPublic: boolean,
        isRequireApproval: boolean,
        isWaitlist: boolean
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
                city: city,
                country: country,
                platform: platform,
                link: link,
                description: description,
                startDate: startDate,
                endDate: endDate,
                status: status,
                organizationId: organizationId,
                userId: userId,
                theme: theme,
                // timeZone: timeZone,
                isPublic: isPublic,
                isRequireApproval: isRequireApproval,
                isWaitlist: isWaitlist
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

    async getAllEvents(start: number, limit: number) {
        const skip = (start - 1)*limit;
        const [foundEvents, total] = await Promise.all([
            await this.prismaService.event.findMany({
                where: {
                    status: "ACTIVE",
                    isPublic: true,
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
    };

    async getForYouEvents(userId: number) {
        
        const events = await this.prismaService.userFavouriteTopic.findMany({
            where: { userId: userId},
            select: {
                topic: {
                    select: {
                        name: true,
                        events: {
                            select: {
                                event: {
                                    select: {
                                        id: true,
                                        name: true,
                                        startDate: true,
                                        endDate: true,
                                        isRequireApproval: true,
                                        description: true,
                                    },
                                    
                                }
                            }
                        }
                    }
                }
            },
        });
        return events;
    };

    async editEvent(
        eventId: number, 
        organizationId: number,
        name: string, 
        city: string,
        country: string,
        platform: string,
        link: string,
        locationType: LocationType, 
        description: string, 
        startDate: Date, 
        endDate: Date, 
        status: Status,
        theme: Theme,
        isPublic: boolean,
        isRequireApproval: boolean,
        isWaitlist: boolean
    ) {
        const updatedEvent = await this.prismaService.event.update({
            where: {
                id: eventId
            },
            data: {
                name: name,
                locationType: locationType,
                city: city,
                country: country,
                platform: platform,
                link: link,
                description: description,
                startDate: startDate,
                endDate: endDate,
                status: status,
                theme: theme,
                isRequireApproval: isRequireApproval,
                isWaitlist: isWaitlist,
                organizationId: organizationId,
                isPublic: isPublic,
            }
        });

        return updatedEvent;
    };
    async ableEvent(eventId: number) {
        const updatedEvent = await this.prismaService.event.update({
            data: {
                status: "ACTIVE"
            },
            where: {
                id: eventId
            }
        });
        return updatedEvent;
    };

    async getEventByUserId(userId: number) {
        const foundEvent = await this.prismaService.event.findFirst({
            where: {
                userId: userId,

            }
        });
        return foundEvent;
    }

}