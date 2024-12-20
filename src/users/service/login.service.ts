import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { PayloadDto } from '../dto/payload.dto';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';
import { UserRepository } from '../repository/user-repository.abstract';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: PayloadDto = {
      sub: user.id,
      checked: user.checked,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
