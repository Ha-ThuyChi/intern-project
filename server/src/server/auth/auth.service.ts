import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/server/repository/user.repository';
import { UserDTO } from '../users/dto/user.dto';

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
            throw new BadRequestException('Password does not match');
        }
        const payload = { sub: foundUser.id, email: foundUser.email };
        const accessToken = await this.jwtService.signAsync(payload);
        return {success: true, message: {accessToken: accessToken, email: foundUser.email}}
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
            data.image
        );
        if (!createdUser) {
            throw new ConflictException("Cannot sign up.")
        };
        return {success: true, message: "Sign up successfully."}
    }
}
