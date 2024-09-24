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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../repository/user.repository");
let AuthService = class AuthService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async signIn(data) {
        const foundUser = await this.userRepository.findOneByEmail(data.email);
        if (!foundUser) {
            throw new common_1.NotFoundException(`${data.email} does not exist.`);
        }
        const isMatch = bcrypt.compareSync(data.password, foundUser.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Password does not match');
        }
        const payload = { sub: foundUser.id, email: foundUser.email };
        const accessToken = await this.jwtService.signAsync(payload);
        return { success: true, message: { accessToken: accessToken, email: foundUser.email } };
    }
    ;
    async signUp(data) {
        const foundUser = await this.userRepository.findOneByEmail(data.email);
        if (foundUser) {
            throw new common_1.NotFoundException(`${data.email} is already existed.`);
        }
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const createdUser = await this.userRepository.createUser(data.email, hashedPassword, data.name, data.phone);
        if (!createdUser) {
            throw new common_1.ConflictException("Cannot sign up.");
        }
        ;
        return { success: true, message: "Sign up successfully." };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map