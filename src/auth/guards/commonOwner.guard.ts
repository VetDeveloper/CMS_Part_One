import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Observable } from 'rxjs';

@Injectable()
export class CommonOwnerGuard<T extends { userId: number }>
  implements CanActivate
{
  constructor(private contentService: TypeOrmCrudService<T>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const contentId = parseInt(req.params.id);

    let ownerId: Promise<T | { userId: number }> =
      this.contentService.findOne(contentId);

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
