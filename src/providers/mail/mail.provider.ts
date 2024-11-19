import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Env } from 'src/config/env';

@Injectable()
export class MailProvider {
  private transporter: nodemailer.Transporter;
  private port: number;

  constructor(private readonly configService: ConfigService<Env>) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST', { infer: true }), // Exemplo para serviços de SMTP
      port: 587, // Porta padrão para SMTP com STARTTLS
      secure: false, // False para STARTTLS
      auth: {
        user: this.configService.get<string>('MAIL_EMAIL', { infer: true }),
        pass: this.configService.get<string>('MAIL_PASSWORD', { infer: true }),
      },
    });
    this.port = configService.get('PORT');
  }

  async sendEmail(userEmail: string, validationId: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get('MAIL_EMAIL', { infer: true }),
      to: userEmail,
      subject: 'Confirme seu e-mail clicando no link abaixo',
      text: `http://localhost:${this.port}/email/confirm?token=${validationId}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(userEmail: string, resetToken: string) {
    const mailOptions = {
      from: this.configService.get('MAIL_EMAIL', { infer: true }),
      to: userEmail,
      subject: 'Clique aqui para recuperar sua senha',
      text: `http://localhost:${this.port}/password/reset?token=${resetToken}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
