import { Module } from '@nestjs/common';
import { CreateUserService } from './service/create-user.service';
import { CreateUserController } from './controller/create-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user-repository.abstract';
import { UserRepositoryImpl } from './repository/user-repository.impl';
import { PasswordService } from 'src/providers/encryption/password.encryption.service';
import { MailProvider } from 'src/providers/mail/mail.provider';
import { LoginController } from './controller/login-controller';
import { LoginService } from './service/login.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config/env';
import { ConfirmEmailController } from './controller/confirm-email.controller';
import { ConfirmEmailService } from './service/confirm-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get<string>('JWT_PRIVATE_KEY');
        const publicKey = config.get<string>('JWT_PUBLIC_KEY');

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [
    //Controller para cria um usuário
    CreateUserController,

    //Controller para authenticar um usuário
    LoginController,

    ConfirmEmailController,
  ],
  providers: [
    //Service para cria um usuário
    CreateUserService,

    // Criptografa uma senha
    PasswordService,

    // Envia Email
    MailProvider,

    // Service para authenticar um usuário
    LoginService,
    ConfirmEmailService,

    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
