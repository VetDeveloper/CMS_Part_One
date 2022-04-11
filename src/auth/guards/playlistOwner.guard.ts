import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
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

    let ownerId: Promise<PlaylistDTO> =
      this.playlistService.findOne(PlaylistId);

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
