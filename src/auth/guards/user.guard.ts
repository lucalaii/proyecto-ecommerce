import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const idUser = req.body.userId;

    console.log(user.id, '-', idUser);

    if (user.id !== idUser.id) {
      throw new UnauthorizedException(
        'No puedes acceder a los datos de otro usuario',
      );
    }
    return true;
  }
}
