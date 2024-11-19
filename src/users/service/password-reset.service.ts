import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user-repository.abstract';
import { UpdatePasswordDto } from '../dto/update-passoword.dto';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async passwordReset(token: string, { password }: UpdatePasswordDto) {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new NotFoundException('Token inválido ou expirado');
    }

    // Criptografa a nova senha
    const hashedPassword = await this.passwordService.hashPassword(password);

    return await this.userRepository.updatepassword(user.id, hashedPassword);
  }
}
