import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrganizationRepository {
    constructor(private prismaService: PrismaService) {}

    async createOrganization(userId: number, name: string, description: string, phone: string, email: string) {
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
    };

    async findOne(organizationId: number) {
        const foundOrganization = await this.prismaService.organization.findUnique({
            where: {
                id: organizationId
            }
        })
        return foundOrganization;
    }

    async findManyByUserId(userId: number, start: number, limit: number) {
        const skip = (start - 1)*limit;
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
        ])
        return {
            list: organizations,
            total: total,
            limit: limit,
            page: start,
            maxPage: Math.ceil(Number(total) / Number(limit)),
        };
    };

    async updateOrganization(organizationId: number, name: string, description: string, phone: string, email: string) {
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
    };
    
    async deleteOrganization(organizationId: number) {
        const deletedOrganization = await this.prismaService.organization.delete({
            where: {
                id: organizationId
            }
        });
        return deletedOrganization;
    };
}