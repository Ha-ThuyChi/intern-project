import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { OrganizationRepository } from "src/server/repository/organization.repository";
import { OrganizationDTO } from "./dto/organization.dto";
import { PaginationDTO } from "src/pagination.dto";

@Injectable()
export class OrganizationService {
    constructor(private organizationRepository: OrganizationRepository) {}

    async createOrganization(userId: number, data: OrganizationDTO) {
        const createdOrganization = await this.organizationRepository.createOrganization(
            userId,
            data.name,
            data.description,
            data.email,
            data.phone
        );

        if (!createdOrganization) {
            throw new NotAcceptableException("Cannot create new organization.")
        };
        return {success: true, message: "Organization is created."}
    };

    async findOne(organizationId: number) {
        const foundOrganization = await this.organizationRepository.findOne(organizationId);

        if (!foundOrganization) {
            throw new NotFoundException("Organization not found.")
        };
        return {success: true, message: foundOrganization}
    };

    async findManyByUserId(userId: number, page: number, limit: number) {
        const foundOrganizations = await this.organizationRepository.findManyByUserId(userId, page, limit)

        if (!foundOrganizations) {
            throw new NotFoundException("Organizations not found.")
        };
        return foundOrganizations;
    };

    async updateOrganization(organizationId: number, data: OrganizationDTO) {
        const updatedOrganization = await this.organizationRepository.updateOrganization(
            organizationId, 
            data.name, 
            data.description, 
            data.phone, 
            data.email
        );
        if (!updatedOrganization) {
            throw new NotFoundException("Cannot updated organization.")
        };
        return {success: true, message: updatedOrganization};
    };
    
    async deletedOrganization(organizationId: number) {
        const deletedOrganization = await this.organizationRepository.deletedOrganization(organizationId);
        if (!deletedOrganization) {
            throw new NotFoundException("Cannot delete organization.")
        };
        return {success: true, message: deletedOrganization};
    };
}