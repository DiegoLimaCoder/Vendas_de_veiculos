import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../repository/user-repository.abstract';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';
import { CreateAdminDto, UserRole } from '../dto/create-admin.dto';
import { MailProvider } from 'src/providers/mail/mail.provider';

@Injectable()
export class CreateAdminService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly mailProvider: MailProvider,
  ) {}

  async onModuleInit() {
    const adminPassword = await this.passwordService.hashPassword('admin123');
    const adminData: CreateAdminDto = {
      name: 'ADMIN',
      email: 'diegogoncalveisreisdelima@gmail.com',
      password: adminPassword,
      role: UserRole.ADMIN,
    };

    const user = await this.userRepository.findByEmail(adminData.email);

    if (user) {
      console.log('Email já existe');
      return;
    }

    const userAdmin = await this.userRepository.create(adminData);
    await this.mailProvider.sendEmail(
      adminData.email,
      userAdmin.validationToken,
    );

    return userAdmin;
  }
}
