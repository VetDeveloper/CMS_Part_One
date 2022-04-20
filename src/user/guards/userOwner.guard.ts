import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/user/dto/user.dto';
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

    const ownerId: Promise<UserDTO> = this.userService.findOne(userId);

    return ownerId.then((resp) => {
      try {
        resp.id;
      } catch (e) {
        throw new NotFoundException(e);
      }
      return logUserId === resp.id;
    });
  }
}
