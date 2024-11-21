import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user-repository.abstract';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { TokenService } from 'src/providers/uuid/token.service';
import { MailProvider } from 'src/providers/mail/mail.provider';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async sendPasswordResetEmail({ email }: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email não registrado');
    }
    if (!user.checked) {
      throw new ConflictException('O e-mail já existe');
    }
    const resetToken = this.tokenService.generateToken();

    await this.userRepository.generateResetToken(user.id, resetToken);
    await this.mailProvider.sendPasswordResetEmail(user.email, resetToken);
    return { message: 'Email de redefinição de senha enviado' };
  }
}
