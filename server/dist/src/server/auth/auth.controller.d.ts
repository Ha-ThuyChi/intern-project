import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
