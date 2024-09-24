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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const ticket_dto_1 = require("./dto/ticket.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    createTicket(eventId, data) {
        return this.ticketService.createTicket(Number(eventId), data);
    }
    ;
    updateTicket(ticketId, data) {
        return this.ticketService.updateTicket(Number(ticketId), data);
    }
    ;
    getTicketByEventId(eventId) {
        return this.ticketService.getTicketByEventId(Number(eventId));
    }
    ;
    getTicketByTicketId(ticketId) {
        return this.ticketService.getTicketByTicketId(Number(ticketId));
    }
    ;
    deleteTicket(ticketId) {
        return this.ticketService.deleteTicket(Number(ticketId));
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Post)(":eventId/ticket"),
    __param(0, (0, common_1.Param)("eventId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.TicketDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Patch)(":ticketId/ticket"),
    __param(0, (0, common_1.Param)("ticketId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticket_dto_1.TicketDTO]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Get)(":eventId"),
    __param(0, (0, common_1.Param)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getTicketByEventId", null);
__decorate([
    (0, common_1.Get)(":ticketId/ticket"),
    __param(0, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getTicketByTicketId", null);
__decorate([
    (0, common_1.Delete)(":ticketId"),
    __param(0, (0, common_1.Param)("ticketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "deleteTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)("tickets"),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map