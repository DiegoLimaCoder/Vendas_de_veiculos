import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from './user-repository.abstract';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para criar um usuário
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return plainToClass(UserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  // Método para buscar um usuário por e-mail
  async findByEmail(email: string): Promise<UserResponseDto> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByToken(token: string): Promise<UserResponseDto | null> {
    return await this.userRepository.findOne({
      where: {
        validationToken: token,
      },
    });
  }

  async updateChecked(id: string): Promise<void> {
    await this.userRepository.update(id, {
      checked: true,
      validationToken: null,
    });
  }

  async generateResetToken(id: string, resetToken: string): Promise<void> {
    await this.userRepository.update(id, {
      resetToken,
    });
  }
}
