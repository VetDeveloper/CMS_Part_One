import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Content } from 'src/content/content.entity';
import { ContentService } from 'src/content/content.service';
import { ContentDTO } from 'src/content/dto/content.dto';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
  constructor(private contentService: ContentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const contentId = parseInt(req.params.id);

    let ownerId: Promise<ContentDTO> = this.contentService.findOne(contentId);

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
