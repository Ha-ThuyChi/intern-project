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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const organization_dto_1 = require("./dto/organization.dto");
const organization_service_1 = require("./organization.service");
const pagination_dto_1 = require("../pagination.dto");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    createOrganization(userId, data) {
        return this.organizationService.createOrganization(Number(userId), data);
    }
    ;
    getOrganizationByOrganizationtId(organizationId) {
        return this.organizationService.findOne(Number(organizationId));
    }
    ;
    getOrganizationByUserId(userId, data) {
        return this.organizationService.findManyByUserId(Number(userId), Number(data.page), Number(data.limit));
    }
    ;
    updateOrganization(organizationId, data) {
        return this.organizationService.updateOrganization(Number(organizationId), data);
    }
    ;
    deleteOrganization(organizationId) {
        return this.organizationService.deleteOrganization(Number(organizationId));
    }
    ;
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Post)(":userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, organization_dto_1.OrganizationDTO]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "createOrganization", null);
__decorate([
    (0, common_1.Get)(":organizationId"),
    __param(0, (0, common_1.Param)("organizationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "getOrganizationByOrganizationtId", null);
__decorate([
    (0, common_1.Get)("organization/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDTO]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "getOrganizationByUserId", null);
__decorate([
    (0, common_1.Patch)(":organizationId"),
    __param(0, (0, common_1.Param)("organizationId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, organization_dto_1.OrganizationDTO]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Delete)(":organizationId"),
    __param(0, (0, common_1.Param)("organizationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrganizationController.prototype, "deleteOrganization", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)("organizations"),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map