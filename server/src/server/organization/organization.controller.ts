import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { OrganizationDTO } from "./dto/organization.dto";
import { OrganizationService } from "./organization.service";
import { PaginationDTO } from "src/server/pagination.dto";

@Controller("organizations")
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    
    @Post(":userId")
    createOrganization(
        @Param("userId") userId: number,
        @Body() data: OrganizationDTO
    ) {
        return this.organizationService.createOrganization(Number(userId), data)
    };

    @Get(":organizationId")
    getOrganizationByOrganizationtId(
        @Param("organizationId") organizationId: number
    ) {
        return this.organizationService.findOne(Number(organizationId));
    };

    @Get("organization/:userId")
    getOrganizationByUserId(
        @Param("userId") userId: number,
        @Query() data: PaginationDTO
    ) {
        return this.organizationService.findManyByUserId(Number(userId), Number(data.page), Number(data.limit));
    };

    @Patch(":organizationId")
    updateOrganization(
        @Param("organizationId") organizationId: number,
        @Body() data: OrganizationDTO
    ) {
        return this.organizationService.updateOrganization(Number(organizationId), data);
    };
    
    @Delete(":organizationId")
    deleteOrganization(
        @Param("organizationId") organizationId: number,
    ) {
        return this.organizationService.deleteOrganization(Number(organizationId));
    };
}