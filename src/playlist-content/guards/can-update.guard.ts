import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { PlaylistContentService } from "../playlist-content.service";

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private playlistContentService: PlaylistContentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const body = req.body;
    const alreadyExists = this.playlistContentService.findOne({
      where: {
        playlistId: body.playlistId,
        ordinalNumber: body.ordinalNumber,
      },
    });

    return alreadyExists.then((resp) => {
        try {
            resp.id
        } catch(e) {
            return true;            
        }
        throw new BadRequestException('Повторяющиеся значения');
    })
  }
}
