import { BadRequestException, ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/server/repository/user.repository';
import { UserDTO } from '../users/dto/user.dto';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { totp } from 'otplib';
import e from 'express';

const randomImage = [
    {src: "https://www.flaticon.com/free-icon/tomato_135702?related_id=135702&origin=pack"},
]

function generateSecretForUser() {
  return crypto.randomBytes(20).toString('hex'); // Generates a secure random secret
}

const generateOTP = (secret: string) => {
    totp.options = {
        step: 60,
        digits: 6,
    }
    const OTP = totp.generate(secret)
    console.log(OTP)
    return OTP;
};

function hashedRandomPassword() {
    const generateRandomString = Math.random().toString(20).substr(2, 10)
    const hashedPassword = bcrypt.hashSync(generateRandomString, 10);
    return hashedPassword;
}

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
            data.secret,
            false
        );
        if (!createdUser) {
            throw new ConflictException("Cannot sign up.")
        };
        return {success: true, message: "Sign up successfully."}
    };

    async signInViaGoogle(email: string, given_name: string, family_name: string, picture: string) {
        let foundUser = await this.userRepository.findOneByEmail(email);
        if (!foundUser) {
            foundUser = await this.signUpViaGoogle(email, given_name, family_name, picture)
        }
        const payload = { sub: foundUser.id, userId: foundUser.id };
        const accessToken = await this.jwtService.signAsync(payload);
        return {success: true, message: {accessToken: accessToken, userId: foundUser.id, email: foundUser.email}}
    };

    async signUpViaGoogle(email: string, given_name: string, family_name: string, picture: string) {
        const hashedPassword = hashedRandomPassword();
        const secret = generateSecretForUser();
        const createdUser = await this.userRepository.createUser(
          email,
          hashedPassword,
          given_name,
          family_name,
          null,
          null,
          null,
          null,
          picture,
          secret,
          true
        );
        return createdUser;
    };

    async sendOTP(email: string) {
        // check if email exist in the database
        // If not, create new user account
        const foundUser = await this.userRepository.findOneByEmail(email);
        if (!foundUser) {
            const newSecret = generateSecretForUser();
            const hashedPassword = hashedRandomPassword();
            await this.userRepository.createUser(
                email,
                hashedPassword,
                "Given name",
                "Family name",
                null,
                null,
                null,
                null,
                null,
                newSecret,
                true
            )
            await this.userRepository.saveSecret(newSecret, email)
        };
        const secret = await this.userRepository.getSecret(email);
        const otp = generateOTP(secret);
        const sentOTP = await sendVerificationEmail(email, otp);
        if (!sentOTP) {
            return {success: false, message: "Cannot send OTP."}
        }
        return {success: true, message: "OTP is sent to your email."}
    };

    async verifyOTP(otp: string, email: string) {
        const foundUser = await this.userRepository.findOneByEmail(email);
        const secret = await this.userRepository.getSecret(email);
        const isValid = totp.verify({ token: otp, secret });
        if (isValid) {
            const payload = { sub: foundUser.id, userId: foundUser.id };
            const accessToken = await this.jwtService.signAsync(payload);
            return {success: true, message: {accessToken: accessToken, userId: foundUser.id, email: foundUser.email}};
        }
        return {success: false, message: "Your OTP is not correct"}
    }
    
}
