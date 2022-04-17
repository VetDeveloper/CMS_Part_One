import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistContentDTO } from './createplaylistContent.dto';

export class UpdatePlaylistContentDTO extends PartialType(
  CreatePlaylistContentDTO,
) {}
