import { Module } from '@nestjs/common';
import { CreateUserService } from './service/create-user.service';
import { CreateUserController } from './controller/create-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user-repository.abstract';
import { UserRepositoryImpl } from './repository/user-repository.impl';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';
import { MailProvider } from 'src/providers/mail/mail.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [
    //Service para cria um usuário
    CreateUserService,

    // Criptografa uma senha
    PasswordService,

    // Envia Email
    MailProvider,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
