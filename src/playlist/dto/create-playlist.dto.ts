import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PlaylistModel } from './playlist.dto';

export class CreatePlaylistDto extends PickType(PlaylistModel, [
  'userId',
  'screenId',
]) {}
