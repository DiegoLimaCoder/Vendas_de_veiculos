import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  abstract findByEmail(email: string): Promise<UserResponseDto>;
}
