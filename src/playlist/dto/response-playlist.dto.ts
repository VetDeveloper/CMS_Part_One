import { PickType } from '@nestjs/swagger';
import { PlaylistDTO } from './playlist.dto';

export class ResponsePlaylistDTO extends PickType(PlaylistDTO, [
  'userId',
  'screenId',
  'created_at',
  'updated_at',
]) {}
