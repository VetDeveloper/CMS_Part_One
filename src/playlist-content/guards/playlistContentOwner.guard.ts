import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PlaylistContent } from 'src/playlist-content/playlistcontent.entity';
import { PlaylistContentService } from 'src/playlist-content/playlistcontent.service';

@Injectable()
export class PlaylistContentOwnerGuard implements CanActivate {
  constructor(private playlistContentService: PlaylistContentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const playlistContentId = parseInt(req.params.id);

    let ownerId: Promise<PlaylistContent> =
      this.playlistContentService.findOne(playlistContentId);

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
