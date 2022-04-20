import { PickType } from '@nestjs/swagger';
import { PlaylistDTO } from './playlist.dto';

export class ResponsePlaylistDTO extends PickType(PlaylistDTO, [
  'id',
  'userId',
  'screenId',
  'createdAt',
  'updatedAt',
]) {}
