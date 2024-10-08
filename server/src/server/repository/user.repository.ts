import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    async findOneByEmail(email: string) {
        const foundUser = await this.prismaService.user.findUnique({
            where: {
                email: email,
                status: "ACTIVE"
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
        image: string,
        secret: string,
        isVerified: boolean,
        isConnectGoogle: boolean
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
                image: image,
                secret: secret,
                isVerified: isVerified,
                isConnectGoogle: isConnectGoogle
            }
        });
        return createdUser;
    };

    async findOne(userId: number) {
        const foundUser = await this.prismaService.user.findFirst({
            where: {
                id: userId,
                status: "ACTIVE"
            }
        });
        return foundUser;
    };

    async disableAccount(userId: number) {
        const updatedAccount = await this.prismaService.user.update({
            data: {
                status: "PENDING"
            },
            where: {
                id: userId
            }
        });
        return updatedAccount;
    };

    async editAccount(
        userId: number,
        firstName: string,
        lastName: string, 
        city: string,
        country: string,
        phone: string,
    ) {
        const updatedAccount = await this.prismaService.user.update({
            data: {
                firstName: firstName,
                lastName: lastName,
                city: city,
                country: country,
                phone: phone
            }, 
            where: {
                id: userId,
                status: "ACTIVE"
            }
        });
        return updatedAccount;
    };

    async findConnectedGoogleUserByEmail(email :string)  {
        const foundUser = await this.prismaService.user.findFirst({
            where: {
                email: email,
                isConnectGoogle: false
            }
        });
        return foundUser;
    };

    async saveSecret(secret: string, email: string) {
        const updatedUser = await this.prismaService.user.update({
            data: {
                secret: secret
            },
            where: {
                email: email
            }
        });
        return updatedUser;
    };

    async getSecret(email: string) {
        const updatedUser = await this.prismaService.user.findFirst({
            where: {
                email: email
            }
        });
        return updatedUser.secret;
    };

    async deleteUser(email: string) {
        const deletedUser = await this.prismaService.user.delete({
            where: {
                email: email
            }
        });
        return deletedUser;
    };

    async updateVerification(email: string) {
        const updatedUser = await this.prismaService.user.update({
            where: {
                email: email
            },
            data: {
                isVerified: true,
            }
        });
        return updatedUser;
    };

    async changePassword(userId: number, password: string) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const updatedAccount = await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        });
        return updatedAccount
    };

}