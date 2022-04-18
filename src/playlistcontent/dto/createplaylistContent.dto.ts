import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PlaylistContentDTO } from './playlistcontent.dto';

export class CreatePlaylistContentDTO extends PickType(PlaylistContentDTO, [
  'ordinalNumber',
  'duration',
  'contentId',
  'playlistId',
]) {}
