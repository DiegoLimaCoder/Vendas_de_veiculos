import { UserRole } from './create-admin.dto';

export class JwtPayload {
  sub: string;
  checked?: boolean;
  role?: UserRole;
}
