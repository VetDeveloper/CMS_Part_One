import { PickType } from '@nestjs/swagger';
import { PlaylistModel } from './playlist.dto';

export class ResponsePlaylistDTO extends PickType(PlaylistModel, [
  'id',
  'userId',
  'screenId',
  'createdAt',
  'updatedAt',
]) {}
