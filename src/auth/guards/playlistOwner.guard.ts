import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Playlist } from 'src/playlist/playlist.entity';
import { PlaylistService } from 'src/playlist/playlist.service';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(private playlistService: PlaylistService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const PlaylistId = parseInt(req.params.id);

    let ownerId: Promise<Playlist> = this.playlistService.findOne(PlaylistId);

    return ownerId.then((resp) => {
      return logUserId === resp.userId;
    });
  }
}
