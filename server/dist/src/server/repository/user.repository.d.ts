import { PrismaService } from "src/prisma/prisma.service";
export declare class UserRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    findOneByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        address: string | null;
        dob: Date | null;
        image: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.Status;
    }>;
    createUser(email: string, password: string, name: string, phone: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        address: string | null;
        dob: Date | null;
        image: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.Status;
    }>;
    findOne(userId: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        address: string | null;
        dob: Date | null;
        image: string | null;
        phone: string;
        status: import(".prisma/client").$Enums.Status;
    }>;
}
