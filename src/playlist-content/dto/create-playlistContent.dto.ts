import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreatePlaylistContentDTO {
  @ApiProperty({
    example: '1',
    description: 'Порядковый номер контента в плейлисте',
  })
  @IsNumber()
  readonly ordinalNumber: number;

  @ApiProperty({ example: '23', description: 'Длительность контента' })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер контенета',
  })
  @IsNumber()
  readonly contentId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер плейлиста',
  })
  @IsNumber()
  readonly playlistId: number;
}
