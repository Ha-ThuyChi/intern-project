import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    async findOneByEmail(email: string) {
        const foundUser = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        });
        return foundUser;
    };
    async createUser(email: string, password: string, name: string, phone: string) {
        const createdUser = await this.prismaService.user.create({
            data: {
                email: email,
                password: password,
                name: name,
                phone: phone
            }
        });
        return createdUser;
    }
}