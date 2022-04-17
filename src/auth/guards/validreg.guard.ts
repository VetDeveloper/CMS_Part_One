import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ValidRegistrationGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.userService.getUserByEmail(req.body.email).then((res) => {
      if (res) {
        throw new BadRequestException(
          'Пользователь с таким email уже существует',
        );
      }
      return true;
    });
  }
}
