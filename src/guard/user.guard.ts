import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from './role.guard';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard extends RoleGuard {
  constructor(jwtService: JwtService) {
    super(jwtService, (role) => role !== 'ADMIN' || role === undefined);
  }
}
