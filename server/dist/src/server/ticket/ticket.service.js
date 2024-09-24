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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const ticket_repository_1 = require("../repository/ticket.repository");
const event_repository_1 = require("../repository/event.repository");
let TicketService = class TicketService {
    constructor(ticketRepository, eventRepository) {
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
    }
    async createTicket(eventId, data) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new common_1.NotFoundException("Event does not exist.");
        }
        ;
        const foundTickets = await this.ticketRepository.getTickets(eventId, data.ticketType);
        if (data.ticketType === "FREE" || data.ticketType === "DONATION") {
            if (data.price !== 0) {
                throw new common_1.NotAcceptableException("Invalid price.");
            }
        }
        let createdTicket;
        if (foundTickets) {
            if (foundTickets.endDate <= new Date()) {
                throw new common_1.NotAcceptableException("Cannot create more ticket because the selling is over.");
            }
            createdTicket = await this.ticketRepository.updateQuantity(foundTickets.id, foundTickets.quantity + data.quantity);
        }
        else {
            createdTicket = await this.ticketRepository.createTicket(eventId, data.ticketType, data.name, data.price, data.quantity, data.isVisible, data.startDate, data.endDate);
        }
        if (!createdTicket) {
            return ({ success: false, message: "Ticket is not created." });
        }
        return ({ success: true, message: "Ticket is created." });
    }
    ;
    async updateTicket(ticketId, data) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new common_1.NotFoundException("Ticket does not exist.");
        }
        ;
        if (data.ticketType === "FREE" || data.ticketType === "DONATION") {
            if (data.price !== 0) {
                throw new common_1.NotAcceptableException("Invalid price.");
            }
        }
        const updatedTicket = await this.ticketRepository.updateTicket(ticketId, data.ticketType, data.name, data.price, data.quantity, data.isVisible, data.startDate, data.endDate);
        if (!updatedTicket) {
            return ({ success: false, message: "Ticket is not updated." });
        }
        return ({ success: true, message: "Ticket is updated." });
    }
    ;
    async getTicketByEventId(eventId) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new common_1.NotFoundException("Event does not exist.");
        }
        ;
        const foundTickets = await this.ticketRepository.getTicketByEventId(eventId);
        if (!foundTickets) {
            return ({ success: false, message: "No ticket to display." });
        }
        return ({ success: true, message: foundTickets });
    }
    ;
    async getTicketByTicketId(ticketId) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            return ({ success: false, message: "No ticket to display." });
        }
        return ({ success: true, message: foundTicket });
    }
    ;
    async deleteTicket(ticketId) {
        const foundTicket = await this.ticketRepository.getTicketByTicketId(ticketId);
        if (!foundTicket) {
            throw new common_1.NotFoundException("Ticket not found.");
        }
        if (foundTicket.startDate > new Date()) {
            throw new common_1.NotAcceptableException("Ticket is being selling now. Cannot delete ticket.");
        }
        ;
        const deletedTicket = await this.ticketRepository.deleteTicket(ticketId);
        if (!deletedTicket) {
            return ({ success: false, message: "Ticket is not deleted." });
        }
        ;
        return ({ success: true, message: "Ticket is deleted." });
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ticket_repository_1.TicketRepository,
        event_repository_1.EventRepository])
], TicketService);
//# sourceMappingURL=ticket.service.js.map