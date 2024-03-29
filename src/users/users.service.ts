import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  getUsers() {
    return this.userRepository.findAll({});
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return user;
  }
}
