import { UserRole } from './create-admin.dto';

export class PayloadDto {
  sub: string;
  checked?: boolean;
  role?: UserRole;
}
