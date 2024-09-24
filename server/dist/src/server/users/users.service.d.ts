import { UserRepository } from 'src/server/repository/user.repository';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findOneByEmail(email: string): Promise<{
        success: boolean;
        message: Promise<{
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
    }>;
    findOne(userId: number): Promise<{
        success: boolean;
        message: {
            id: number;
            name: string;
            email: string;
            password: string;
            address: string | null;
            dob: Date | null;
            image: string | null;
            phone: string;
            status: import(".prisma/client").$Enums.Status;
        };
    }>;
    createUSer(email: string, password: string, name: string, phone: string): Promise<{
        success: boolean;
        message: Promise<{
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
    }>;
}
