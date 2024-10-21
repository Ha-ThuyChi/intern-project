import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionRepository {
    constructor(private prismaService: PrismaService) {}

    async createsession(
        eventId: number, 
        name: string, 
        description: string,
        startDate: Date, 
        endDate: Date,
        hostName: string,
    ) {
        const createdSession = await this.prismaService.session.create({
            data: {
                eventId: eventId,
                name: name,
                description: description, 
                startDate: startDate,
                endDate: endDate,
                hostName: hostName,
            }
        });
        return createdSession;
    };

    async findOne(sessionId: number) {
        const foundsession = await this.prismaService.session.findUnique({
            where: {
                id: sessionId
            }
        })
        return foundsession;
    }

    async findManyByEventId(eventId: number, start: number, limit: number) {
        const skip = (start - 1)*limit;
        const [sessions, total] = await Promise.all([
            await this.prismaService.session.findMany({
                where: {
                    eventId: eventId
                },
                orderBy: {
                    startDate: "asc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.session.count({
                where: {
                    eventId: eventId
                }
            })
        ])
        return {
            list: sessions,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    };

    async updateSession(
        sessionId: number, 
        name: string, 
        description: string,
        startDate: Date, 
        endDate: Date,
        hostName: string,
    ) {
        const updatedsession = await this.prismaService.session.update({
            data: {
                name: name,
                description: description, 
                startDate: startDate,
                endDate: endDate,
                hostName: hostName,
            },
            where: {
                id: sessionId
            }
        });
        return updatedsession;
    };
    
    async deleteSession(sessionId: number) {
        const deletedsession = await this.prismaService.session.delete({
            where: {
                id: sessionId
            }
        });
        return deletedsession;
    };
}