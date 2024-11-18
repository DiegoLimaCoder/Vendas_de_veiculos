import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  // Criptografa a senha
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  // Compara a senha fornecida com a criptografada
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }
}
