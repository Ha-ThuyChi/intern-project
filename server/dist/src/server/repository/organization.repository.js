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
exports.OrganizationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrganizationRepository = class OrganizationRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createOrganization(userId, name, description, phone, email) {
        const createdOrganization = await this.prismaService.organization.create({
            data: {
                userId: userId,
                name: name,
                description: description,
                phone: phone,
                email: email
            }
        });
        return createdOrganization;
    }
    ;
    async findOne(organizationId) {
        const foundOrganization = await this.prismaService.organization.findUnique({
            where: {
                id: organizationId
            }
        });
        return foundOrganization;
    }
    async findManyByUserId(userId, start, limit) {
        const skip = (start - 1) * limit;
        const [organizations, total] = await Promise.all([
            await this.prismaService.organization.findMany({
                where: {
                    userId: userId
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: skip,
                take: limit,
            }),
            await this.prismaService.organization.count({
                where: {
                    userId: userId
                }
            })
        ]);
        return {
            list: organizations,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    }
    ;
    async updateOrganization(organizationId, name, description, phone, email) {
        const updatedOrganization = await this.prismaService.organization.update({
            data: {
                name: name,
                description: description,
                phone: phone,
                email: email
            },
            where: {
                id: organizationId
            }
        });
        return updatedOrganization;
    }
    ;
    async deleteOrganization(organizationId) {
        const deletedOrganization = await this.prismaService.organization.delete({
            where: {
                id: organizationId
            }
        });
        return deletedOrganization;
    }
    ;
};
exports.OrganizationRepository = OrganizationRepository;
exports.OrganizationRepository = OrganizationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationRepository);
//# sourceMappingURL=organization.repository.js.map