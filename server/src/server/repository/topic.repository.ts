import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TopicRepository {
    constructor(private prismaService: PrismaService) {} 

    async create(name: string, numberOfEvents: number) {
        const createdTopic = await this.prismaService.topic.create({
            data: {
                name: name,
                numberOfEvents: numberOfEvents
            }
        });
        return createdTopic;
    };

    async getAll(start: number, limit: number) {
        const skip = (start - 1)*limit;
        const [topics, total] = await Promise.all([
            await this.prismaService.topic.findMany({
                orderBy: {
                    numberOfEvents: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.topic.count()
        ])
        return {
            list: topics,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    };

    async addTopic(topicId: number, eventId: number) {
        const addedTopic = await this.prismaService.topicsOfEvents.create({
            data: {
                topicId: topicId,
                eventId: eventId
            }
        });
        await this.prismaService.topic.update({
            where: {
                id: topicId
            },
            data: {
                numberOfEvents: {
                    increment: 1,
                }
            }
        })
        return addedTopic;
    };

    async findByTopicId(topicId: number) {
        const topic = await this.prismaService.topic.findUnique({
            where: {id: topicId}
        });
        return topic;
    };

    async findByName(topicName: string) {
        const topic = await this.prismaService.topic.findFirst({
            where: {name: topicName}
        });
        return topic;
    };

    async findTopicOfEvent(topicId: number, eventId: number) {
        const result = await this.prismaService.topicsOfEvents.findFirst({
            where: {
                topicId: topicId,
                eventId: eventId
            }
        });
        return result;
    }
}