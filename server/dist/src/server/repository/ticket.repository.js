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
exports.TicketRepository = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let TicketRepository = class TicketRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createTicket(eventId, ticketType, name, price, quantity, isVisible, startDate, endDate) {
        const createdTicket = await this.prismaService.ticket.create({
            data: {
                eventId: eventId,
                ticketType: ticketType,
                name: name,
                price: price,
                quantity: quantity,
                isVisible: isVisible,
                startDate: startDate,
                endDate: endDate
            }
        });
        return createdTicket;
    }
    ;
    async updateTicket(ticketId, ticketType, name, price, quantity, isVisible, startDate, endDate) {
        const updatedTicket = await this.prismaService.ticket.update({
            data: {
                ticketType: ticketType,
                name: name,
                price: price,
                quantity: quantity,
                isVisible: isVisible,
                startDate: startDate,
                endDate: endDate
            },
            where: {
                id: ticketId
            }
        });
        return updatedTicket;
    }
    ;
    async getTicketByEventId(eventId) {
        const foundTickets = await this.prismaService.ticket.findMany({
            where: {
                eventId: eventId
            }
        });
        return foundTickets;
    }
    ;
    async getTicketByTicketId(ticketId) {
        const foundTicket = await this.prismaService.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        return foundTicket;
    }
    ;
    async getTickets(eventId, ticketType) {
        const foundTickets = await this.prismaService.ticket.findFirst({
            where: {
                eventId: eventId,
                ticketType: ticketType,
            }
        });
        return foundTickets;
    }
    async deleteTicketType(ticketId) {
        const deletedTicket = await this.prismaService.ticket.delete({
            where: {
                id: ticketId
            }
        });
        return deletedTicket;
    }
};
exports.TicketRepository = TicketRepository;
exports.TicketRepository = TicketRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketRepository);
//# sourceMappingURL=ticket.repository.js.map