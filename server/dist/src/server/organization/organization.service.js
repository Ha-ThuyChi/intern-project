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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("../repository/organization.repository");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async createOrganization(userId, data) {
        const createdOrganization = await this.organizationRepository.createOrganization(userId, data.name, data.description, data.email, data.phone);
        if (!createdOrganization) {
            throw new common_1.NotAcceptableException("Cannot create new organization.");
        }
        ;
        return { success: true, message: "Organization is created." };
    }
    ;
    async findOne(organizationId) {
        const foundOrganization = await this.organizationRepository.findOne(organizationId);
        if (!foundOrganization) {
            throw new common_1.NotFoundException("Organization not found.");
        }
        ;
        return { success: true, message: foundOrganization };
    }
    ;
    async findManyByUserId(userId, page, limit) {
        const foundOrganizations = await this.organizationRepository.findManyByUserId(userId, page, limit);
        if (!foundOrganizations) {
            throw new common_1.NotFoundException("Organizations not found.");
        }
        ;
        return { sucess: true, message: foundOrganizations };
    }
    ;
    async updateOrganization(organizationId, data) {
        const updatedOrganization = await this.organizationRepository.updateOrganization(organizationId, data.name, data.description, data.phone, data.email);
        if (!updatedOrganization) {
            throw new common_1.NotFoundException("Cannot updated organization.");
        }
        ;
        return { success: true, message: updatedOrganization };
    }
    ;
    async deleteOrganization(organizationId) {
        const deletedOrganization = await this.organizationRepository.deleteOrganization(organizationId);
        if (!deletedOrganization) {
            throw new common_1.NotFoundException("Cannot delete organization.");
        }
        ;
        return { success: true, message: deletedOrganization };
    }
    ;
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map