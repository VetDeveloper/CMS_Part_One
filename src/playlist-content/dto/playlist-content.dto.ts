import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ContentDTO } from 'src/content/dto/content.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class PlaylistContentDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @Exclude()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер плейлиста',
  })
  @IsNumber()
  playlistId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер контенета',
  })
  @IsNumber()
  contentId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'Порядковый номер контента в плейлисте',
  })
  @IsNumber()
  ordinalNumber: number;

  @ApiProperty({ example: '1', description: 'Длительность контента' })
  @IsNumber()
  duration: number;

  playlist: PlaylistDTO;

  user: UserDTO;

  content: ContentDTO;
}
