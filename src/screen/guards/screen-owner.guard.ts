import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScreenModel } from 'src/screen/dto/screen.dto';
import { Screen } from 'src/screen/screen.entity';
import { ScreenService } from 'src/screen/screen.service';

@Injectable()
export class ScreenOwnerGuard implements CanActivate {
  constructor(private screenService: ScreenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const screenId = parseInt(req.params.id);

    const ownerId: Promise<ScreenModel> = this.screenService.findOne(screenId);

    return ownerId.then((resp) => {
      try {
        resp.userId;
      } catch (e) {
        throw new NotFoundException(e);
      }
      return logUserId === resp.userId;
    });
  }
}
