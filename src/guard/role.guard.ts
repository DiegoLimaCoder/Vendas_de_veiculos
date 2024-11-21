import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/users/dto/payload.dto';

type RoleValidator = (role: string | undefined) => boolean;

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateRole: RoleValidator,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const payload = this.jwtService.verify<JwtPayload>(token);

    if (!payload.checked) {
      throw new UnauthorizedException('E-mail não confirmado');
    }

    if (!this.validateRole(payload.role)) {
      throw new UnauthorizedException('Acesso negado');
    }

    // Anexa o usuário ao objeto `request` para uso futuro
    request.user = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
