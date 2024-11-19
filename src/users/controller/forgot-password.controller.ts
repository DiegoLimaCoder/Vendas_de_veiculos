import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ForgotPasswordService } from '../service/forgot-password.service';

@Controller('password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('forgot')
  async sendPasswordResetEmail(@Body() { email }: ForgotPasswordDto) {
    return await this.forgotPasswordService.sendPasswordResetEmail({ email });
  }
}
