import { PickType } from '@nestjs/swagger';
import { PlaylistContentDTO } from './playlist-content.dto';

export class ResponsePlaylistContentDTO extends PickType(PlaylistContentDTO, [
  'userId',
  'playlistId',
  'contentId',
  'ordinalNumber',
  'duration',
]) {}
