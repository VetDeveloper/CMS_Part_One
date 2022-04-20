import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistContentDTO } from './create-playlist-content.dto';

export class UpdatePlaylistContentDTO extends PartialType(
  CreatePlaylistContentDTO,
) {}
