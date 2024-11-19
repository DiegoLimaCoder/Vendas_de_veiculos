import { Body, Controller, Patch, Query } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-passoword.dto';
import { PasswordResetService } from '../service/password-reset.service';

@Controller()
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Patch('password/reset')
  async resetPassword(
    @Query('token') token: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.passwordResetService.passwordReset(
      token,
      updatePasswordDto,
    );
  }
}
