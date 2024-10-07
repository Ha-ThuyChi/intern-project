import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/server/repository/user.repository';
import { UserDTO } from '../users/dto/user.dto';
import * as nodemailer from 'nodemailer';


const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
};

const sendVerificationEmail = async (contact: string, otp: string) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chi.hathuy15@gmail.com",
                pass: "xrbt lkkf cjzg arnx",
            },
        });
    
        let info = await transporter.sendMail({
            from: `chi.hathuy15@gmail.com`,
            to: contact,
            subject: "Verification Code",
            text: `Your verification code is: ${otp}`,
        });
        console.log(info)
        return info.messageId;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending verification email");
    }
};
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) {}

    async signIn(data: SignInDTO) {
        const foundUser = await this.userRepository.findOneByEmail(data.email);
        if (!foundUser) {
            throw new NotFoundException(`${data.email} does not exist.`)
        }
        const isMatch: boolean = bcrypt.compareSync(data.password, foundUser.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match.');
        }
        const payload = { sub: foundUser.id, userId: foundUser.id };
        const accessToken = await this.jwtService.signAsync(payload);
        return {success: true, message: {accessToken: accessToken, userId: foundUser.id, email: foundUser.email}}
    };

    async signUp(data: UserDTO) {
        const foundUser = await this.userRepository.findOneByEmail(data.email);
        if (foundUser) {
            throw new NotFoundException(`${data.email} is already existed.`)
        }
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const createdUser = await this.userRepository.createUser(
            data.email,
            hashedPassword,
            data.firstName,
            data.lastName,
            data.phone,
            data.city,
            data.country,
            data.dob,
            data.image,
            false
        );
        if (!createdUser) {
            throw new ConflictException("Cannot sign up.")
        };
        return {success: true, message: "Sign up successfully."}
    };

    async signInViaGoogle(email: string) {
        const foundUser = await this.userRepository.findOneByEmail(email);
        if (!foundUser) {
            return {success: false, message: "Email does not exist. Please sign up."}
        }
        const payload = { sub: foundUser.id, userId: foundUser.id };
        const accessToken = await this.jwtService.signAsync(payload);
        return {success: true, message: {accessToken: accessToken, userId: foundUser.id, email: foundUser.email}}

    };

    async signUpViaGoogle(email: string, given_name: string, family_name: string, picture: string) {
        const generateRandomString = Math.random().toString(20).substr(2, 10)
        const hashedPassword = bcrypt.hashSync(generateRandomString, 10);
        return this.userRepository.createUser(
          email,
          hashedPassword,
          given_name,
          family_name,
          null,
          null,
          null,
          null,
          picture,
          true
        )
    };

    async sendOTP(email: string) {
        const otp = generateOTP();
        const hashedOTP = bcrypt.hashSync(otp, 10);
        const sentOTP = await sendVerificationEmail(email, otp);
        if (!sentOTP) {
            return {success: false, message: "Cannot send OTP."}
        }
        return {success: true, message: "OTP is sent to your email.", otp: hashedOTP}
    }
    
}
