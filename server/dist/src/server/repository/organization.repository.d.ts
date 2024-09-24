import { PrismaService } from "src/prisma/prisma.service";
export declare class OrganizationRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    createOrganization(userId: number, name: string, description: string, phone: string, email: string): Promise<{
        id: number;
        name: string;
        description: string;
        phone: string;
        email: string;
        createdAt: Date;
        userId: number;
    }>;
    findOne(organizationId: number): Promise<{
        id: number;
        name: string;
        description: string;
        phone: string;
        email: string;
        createdAt: Date;
        userId: number;
    }>;
    findManyByUserId(userId: number, start: number, limit: number): Promise<{
        list: {
            id: number;
            name: string;
            description: string;
            phone: string;
            email: string;
            createdAt: Date;
            userId: number;
        }[];
        total: number;
        limit: number;
        page: number;
        maxPage: number;
    }>;
    updateOrganization(organizationId: number, name: string, description: string, phone: string, email: string): Promise<{
        id: number;
        name: string;
        description: string;
        phone: string;
        email: string;
        createdAt: Date;
        userId: number;
    }>;
    deleteOrganization(organizationId: number): Promise<{
        id: number;
        name: string;
        description: string;
        phone: string;
        email: string;
        createdAt: Date;
        userId: number;
    }>;
}
