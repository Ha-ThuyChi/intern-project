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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOneByEmail(email) {
        const foundUser = this.userRepository.findOneByEmail(email);
        if (!foundUser) {
            throw new common_1.NotAcceptableException(`${email} does not exist.`);
        }
        ;
        return { success: true, message: foundUser };
    }
    async findOne(userId) {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) {
            throw new common_1.BadRequestException("User not exist.");
        }
        ;
        return { success: true, message: foundUser };
    }
    async createUSer(email, password, name, phone) {
        const foundUser = this.userRepository.findOneByEmail(email);
        if (foundUser) {
            throw new common_1.ConflictException("Email is already existed.");
        }
        const createdUser = this.userRepository.createUser(email, password, name, phone);
        if (!createdUser) {
            throw new common_1.ConflictException("Cannot create new user.");
        }
        return { success: true, message: createdUser };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map