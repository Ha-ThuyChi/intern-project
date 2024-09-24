"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SessionRepository = class SessionRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createsession(eventId, name, description, startDate, endDate, hostName) {
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
    }
    ;
    async findOne(sessionId) {
        const foundsession = await this.prismaService.session.findUnique({
            where: {
                id: sessionId
            }
        });
        return foundsession;
    }
    async findManyByEventId(eventId, start, limit) {
        const skip = (start - 1) * limit;
        const [sessions, total] = await Promise.all([
            await this.prismaService.session.findMany({
                where: {
                    eventId: eventId
                },
                orderBy: {
                    startDate: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.session.count({
                where: {
                    eventId: eventId
                }
            })
        ]);
        return {
            list: sessions,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    }
    ;
    async updateSession(sessionId, name, description, startDate, endDate, hostName) {
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
    }
    ;
    async deleteSession(sessionId) {
        const deletedsession = await this.prismaService.session.delete({
            where: {
                id: sessionId
            }
        });
        return deletedsession;
    }
    ;
};
exports.SessionRepository = SessionRepository;
exports.SessionRepository = SessionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionRepository);
//# sourceMappingURL=session.repository.js.map