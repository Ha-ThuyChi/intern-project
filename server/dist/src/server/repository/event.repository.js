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
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../enum");
const prisma_service_1 = require("../../prisma/prisma.service");
let EventRepository = class EventRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findOne(eventId) {
        const foundEvent = await this.prismaService.event.findUnique({
            where: {
                id: eventId
            }
        });
        return foundEvent;
    }
    ;
    async findByUserId(userId, start, limit) {
        const skip = (start - 1) * limit;
        const foundUser = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!foundUser) {
            throw new common_1.NotFoundException("User not found.");
        }
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
        ]);
        return {
            list: events,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    }
    ;
    async createEvent(userId, organizationId, name, location, description, image, startDate, endDate, status) {
        if (organizationId) {
            const foundOrganization = await this.prismaService.organization.findUnique({
                where: {
                    id: organizationId
                }
            });
            if (!foundOrganization) {
                throw new common_1.NotFoundException("Organization not found.");
            }
        }
        ;
        const locationType = enum_1.LocationType.OFFLINE;
        console.log(typeof locationType);
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
    }
    ;
    async disableEvent(eventId) {
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
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventRepository);
//# sourceMappingURL=event.repository.js.map