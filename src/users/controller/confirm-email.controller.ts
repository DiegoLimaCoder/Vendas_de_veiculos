import { Controller, Get, Query } from '@nestjs/common';
import { ConfirmEmailService } from '../service/confirm-email.service';

@Controller('email')
export class ConfirmEmailController {
  constructor(private readonly confirmEmailService: ConfirmEmailService) {}

  @Get('confirm')
  async confirmEmail(@Query('token') token: string) {
    return await this.confirmEmailService.confirm(token);
  }
}
