import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class ValidLoginGuard implements CanActivate {
  constructor(private authServ: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return this.authServ
      .validateUser(req.body.email, req.body.password)
      .then((res) => {
        if (!res) {
          throw new UnauthorizedException();
        }
        return true;
      });
  }
}
