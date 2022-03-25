import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Content } from 'src/content/content.entity';
import { ContentService } from 'src/content/content.service';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
  constructor(private contentService: ContentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const contentId = parseInt(req.params.id);

    let ownerId: Promise<Content> = this.contentService.findOne(contentId);

    return ownerId.then((resp) => {
      return logUserId === resp.userId;
    });
  }
}
