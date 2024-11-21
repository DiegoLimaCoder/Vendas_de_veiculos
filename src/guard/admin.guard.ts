import { Injectable } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard extends RoleGuard {
  constructor(jwtService: JwtService) {
    super(jwtService, (role) => role === 'ADMIN');
  }
}
