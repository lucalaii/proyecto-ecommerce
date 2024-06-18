import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from 'src/config/envs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token required');
    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User];

      req.user = payload;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
