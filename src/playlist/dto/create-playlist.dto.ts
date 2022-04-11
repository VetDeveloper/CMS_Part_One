import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PlaylistDTO } from './playlist.dto';

export class CreatePlaylistDto extends PickType(PlaylistDTO, [
  'userId',
  'screenId',
]) {}
