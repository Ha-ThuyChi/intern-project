import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/server/repository/user.repository';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: UserRepository);
    signIn(data: SignInDTO): Promise<{
        success: boolean;
        message: {
            accessToken: string;
            email: string;
        };
    }>;
    signUp(data: SignUpDTO): Promise<{
        success: boolean;
        message: string;
    }>;
}
