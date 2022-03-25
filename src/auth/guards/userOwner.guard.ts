import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/users.entity';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const userId = parseInt(req.params.id);

    let ownerId: Promise<User> = this.userService.findOne(userId);

    return ownerId.then((resp) => {
      return logUserId === resp.id;
    });
  }
}
