import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TokenService {
  /**
   * Gera um token único usando a biblioteca UUID.
   */
  generateToken(): string {
    return UUID();
  }
}
