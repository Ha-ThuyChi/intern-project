import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRepository } from 'src/server/repository/user.repository';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOneByEmail(email: string) {
    const foundUser = this.userRepository.findOneByEmail(email);
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

  async createUSer(data: UserDTO) {
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
      data.image
    );
    if (!createdUser) {
      throw new ConflictException("Cannot create new user.")
    }
    return {success: true, message: createdUser};
  }
}
