import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Generate JWT token for a given payload
  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  // Verify and decode JWT token
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      // Token verification failed
      return null;
    }
  }
}
