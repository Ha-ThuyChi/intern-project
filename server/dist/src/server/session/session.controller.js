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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const session_dto_1 = require("./dto/session.dto");
const session_service_1 = require("./session.service");
const pagination_dto_1 = require("../pagination.dto");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    createSession(eventId, data) {
        return this.sessionService.createSession(Number(eventId), data);
    }
    ;
    getSessionBySessiontId(sessionId) {
        return this.sessionService.findOne(Number(sessionId));
    }
    ;
    getSessionByUserId(eventId, data) {
        return this.sessionService.findManyByEventId(Number(eventId), Number(data.page), Number(data.limit));
    }
    ;
    updateSession(sessionId, data) {
        return this.sessionService.updateSession(Number(sessionId), data);
    }
    ;
    deletesession(sessionId) {
        return this.sessionService.deletedSession(Number(sessionId));
    }
    ;
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Post)(":eventId"),
    __param(0, (0, common_1.Param)("eventId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, session_dto_1.SessionDTO]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)(":sessionId"),
    __param(0, (0, common_1.Param)("sessionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "getSessionBySessiontId", null);
__decorate([
    (0, common_1.Get)("session/:eventId"),
    __param(0, (0, common_1.Param)("eventId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDTO]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "getSessionByUserId", null);
__decorate([
    (0, common_1.Patch)(":sessionId"),
    __param(0, (0, common_1.Param)("sessionId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, session_dto_1.SessionDTO]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Delete)(":sessionId"),
    __param(0, (0, common_1.Param)("sessionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SessionController.prototype, "deletesession", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)("sessions"),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map