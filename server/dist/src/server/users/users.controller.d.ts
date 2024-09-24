import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserInfo(userId: number): Promise<{
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
}
