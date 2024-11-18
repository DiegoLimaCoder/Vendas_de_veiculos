import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../entities/user.entity';

/**
 * DTO para expor informações públicas de um usuário.
 */
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
  @Expose()
  role: UserRole;

  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  checked?: boolean;

  @Expose()
  validationToken?: string;

  @Expose()
  resetToken?: string;
}
