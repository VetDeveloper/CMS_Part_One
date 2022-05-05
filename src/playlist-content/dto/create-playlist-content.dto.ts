import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PlaylistContentModel } from './playlist-content.dto';

export class CreatePlaylistContentDTO extends PickType(PlaylistContentModel, [
  'ordinalNumber',
  'duration',
  'contentId',
  'playlistId',
]) {}
