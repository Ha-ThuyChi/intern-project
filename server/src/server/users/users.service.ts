import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/server/repository/user.repository';
import { UserDTO } from './dto/user.dto';
import { EventRepository } from '../repository/event.repository';
import { ChangePasswordDTO } from './dto/changePassword.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private eventRepository: EventRepository
  ) {}

  async findOneByEmail(email: string) {
    const foundUser = await this.userRepository.findOneByEmail(email);
    if (!foundUser) {
      throw new NotAcceptableException(`${email} does not exist.`)
    };
    return {success: true, message: foundUser};
  }

  async findOne(userId: number) {
    const foundUser = await this.userRepository.findOne(userId);
    if (!foundUser) {
      throw new BadRequestException("User not exist.")
    };
    return {success: true, message: foundUser};
  }

  async createUSer(data: UserDTO, isConnectGoogle: boolean) {
    const foundUser = this.userRepository.findOneByEmail(data.email);
    if (foundUser) {
      throw new ConflictException("Email is already existed.")
    }
    const createdUser = this.userRepository.createUser(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.phone,
      data.city,
      data.country,
      data.dob,
      data.image,
      data.secret,
      false,
      false,
    );
    if (!createdUser) {
      throw new ConflictException("Cannot create new user.")
    }
    return {success: true, message: createdUser};
  };

  async disableAccount(userId: number) {
    const foundEvents = await this.eventRepository.getEventByUserId(userId);
    if (foundEvents) {
      throw new BadRequestException("This account is not allowed to disable due to on-going events.")
    }
    const updatedAccount = await this.userRepository.disableAccount(userId);
    if (!updatedAccount) {
      throw new NotFoundException("Cannot disable this account.")
    }
  };

  async editAccount(
    userId: number,
    data: UserDTO
  ) {
    const updatedAccount = await this.userRepository.editAccount(
      userId, 
      data.firstName, 
      data.lastName, 
      data.city,
      data.country,
      data.phone
    );
    if (!updatedAccount) {
      return {success: false, message: "Cannot update account."};
    }
    return {success: true, message: "Account is updated."};
  };

  async createUserViaGoogle(
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
) {
    const foundUser = await this.userRepository.findConnectedGoogleUserByEmail(email);
    if (foundUser) {
      throw new ConflictException("Email is connected to other account. Please sign in with that account.")
    }
    const createdUser = await this.userRepository.createUser(
      email,
      password,
      firstName,
      lastName,
      phone,
      city,
      country,
      dob,
      image,
      secret,
      true,
      true
    );
    if (!createdUser) {
      throw new ConflictException("Cannot create new user.")
    }
    return {success: true, message: "Account is created successfully."};
  };

  async changePassword(
    userId: number,
    data: ChangePasswordDTO
  ) {
    const isExist = await this.userRepository.checkExistPassword(userId);

    // If pwd is existed, check if the current pwd is match, and if the new pwd is the same as in database
    if (isExist) {
      const isMatch = await this.userRepository.checkMatchingPassword(userId, data.currentPassword);
      if (!isMatch) {
        throw new BadRequestException("Current password is incorrect.");
      };
      const isDuplicatedPassword = await this.userRepository.checkMatchingPassword(userId, data.newPassword);
      if (isDuplicatedPassword) {
        throw new BadRequestException("New password must be different from the old one.");
      };
    }
    const updatedPassword = await this.userRepository.changePassword(userId, data.newPassword);
    if (!updatedPassword) {
      throw new InternalServerErrorException("Cannot update password.");
    };
    return {success: true, message: "Password is updated successgully."};

  }
}
