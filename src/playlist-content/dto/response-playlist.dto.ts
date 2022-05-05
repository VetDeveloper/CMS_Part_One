import { PickType } from '@nestjs/swagger';
import { PlaylistContentModel } from './playlist-content.dto';

export class ResponsePlaylistContentDTO extends PickType(PlaylistContentModel, [
  'id',
  'userId',
  'playlistId',
  'contentId',
  'ordinalNumber',
  'duration',
]) {}
