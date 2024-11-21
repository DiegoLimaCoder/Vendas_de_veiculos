import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  abstract findByEmail(email: string): Promise<UserResponseDto | null>;
  abstract findByToken(token: string): Promise<UserResponseDto | null>;

  abstract updateChecked(id: string): Promise<void>;
  abstract generateResetToken(id: string, resetToken: string): Promise<void>;
  abstract updatepassword(id: string, password: string): Promise<void>;

  abstract findById(id: string): Promise<UserResponseDto>;
}
