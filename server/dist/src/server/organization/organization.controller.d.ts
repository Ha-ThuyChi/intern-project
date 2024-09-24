import { OrganizationDTO } from "./dto/organization.dto";
import { OrganizationService } from "./organization.service";
import { PaginationDTO } from "src/server/pagination.dto";
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    createOrganization(userId: number, data: OrganizationDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    getOrganizationByOrganizationtId(organizationId: number): Promise<{
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
    getOrganizationByUserId(userId: number, data: PaginationDTO): Promise<{
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
