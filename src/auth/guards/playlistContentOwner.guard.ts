import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';
import { PlaylistContentService } from 'src/playlist-content/playlist-content.service';

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
      return logUserId === resp.userId;
    });
  }
}
