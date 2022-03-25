import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistContentDTO } from './create-playlistContent.dto';

export class UpdatePlaylistContentDTO extends PartialType(
  CreatePlaylistContentDTO,
) {}
