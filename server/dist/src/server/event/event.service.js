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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("../repository/event.repository");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async findOne(eventId) {
        const foundEvent = await this.eventRepository.findOne(eventId);
        if (!foundEvent) {
            throw new common_1.NotAcceptableException("Event does not exist.");
        }
        ;
        return { success: true, message: foundEvent };
    }
    ;
    async findByUserId(userId, skip, limit) {
        const foundEvents = await this.eventRepository.findByUserId(userId, skip, limit);
        if (!foundEvents) {
            throw new common_1.NotFoundException("Event not found.");
        }
        ;
        return { success: true, message: foundEvents };
    }
    ;
    async createEvent(userId, data) {
        const createdEvent = await this.eventRepository.createEvent(userId, data.organizationId, data.name, data.location, data.description, data.image, new Date(data.startDate), new Date(data.endDate), data.status);
        if (createdEvent) {
            throw new common_1.NotAcceptableException("Cannot create a new event.");
        }
        ;
        return { success: true, message: "A new event is created." };
    }
    ;
    async disableEvent(eventId) {
        const updatedEvent = await this.eventRepository.disableEvent(eventId);
        if (!updatedEvent) {
            throw new common_1.NotAcceptableException("Cannot disable event.");
        }
        return { success: true, message: "Event is updated." };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventRepository])
], EventService);
//# sourceMappingURL=event.service.js.map