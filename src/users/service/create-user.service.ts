import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user-repository.abstract';
import { MailProvider } from 'src/providers/mail/mail.provider';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly mailProvider: MailProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('O e-mail já existe');
    }

    if (!userExists.checked) {
      throw new ConflictException('O e-mail já existe');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.mailProvider.sendEmail(
      createUserDto.email,
      newUser.validationToken,
    );

    return newUser;
  }
}
