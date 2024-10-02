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

    async createUser(
        email: string, 
        password: string, 
        firstName: string, 
        lastName: string, 
        phone: string, 
        city: string, 
        country: string,
        dob: Date,
        image: string
    ) {
        const createdUser = await this.prismaService.user.create({
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                city: city,
                country: country,
                dob: dob,
                image: image
            }
        });
        return createdUser;
    };

    async findOne(userId: number) {
        const foundUser = await this.prismaService.user.findFirst({
            where: {
                id: userId
            }
        });
        return foundUser;
    }
}