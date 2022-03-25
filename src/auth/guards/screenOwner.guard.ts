import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
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

    let ownerId: Promise<Screen> = this.screenService.findOne(screenId);

    return ownerId.then((resp) => {
      return logUserId === resp.userId;
    });
  }
}
