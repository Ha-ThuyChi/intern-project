import { OrganizationRepository } from "src/server/repository/organization.repository";
import { OrganizationDTO } from "./dto/organization.dto";
export declare class OrganizationService {
    private organizationRepository;
    constructor(organizationRepository: OrganizationRepository);
    createOrganization(userId: number, data: OrganizationDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(organizationId: number): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string;
            phone: string;
            email: string;
            createdAt: Date;
            userId: number;
        };
    }>;
    findManyByUserId(userId: number, page: number, limit: number): Promise<{
        sucess: boolean;
        message: {
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
        };
    }>;
    updateOrganization(organizationId: number, data: OrganizationDTO): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string;
            phone: string;
            email: string;
            createdAt: Date;
            userId: number;
        };
    }>;
    deleteOrganization(organizationId: number): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            description: string;
            phone: string;
            email: string;
            createdAt: Date;
            userId: number;
        };
    }>;
}
