import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user-repository.abstract';

@Injectable()
export class ConfirmEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async confirm(token: string) {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new NotFoundException('Token inválido ou expirado');
    }

    await this.userRepository.updateChecked(user.id);

    return { message: 'Email confirmado com sucesso' };
  }
}
