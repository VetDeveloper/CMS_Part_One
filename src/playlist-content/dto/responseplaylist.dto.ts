import { PickType } from '@nestjs/swagger';
import { PlaylistContentDTO } from './playlistcontent.dto';

export class ResponsePlaylistContentDTO extends PickType(PlaylistContentDTO, [
  'id',
  'userId',
  'playlistId',
  'contentId',
  'ordinalNumber',
  'duration',
]) {}
