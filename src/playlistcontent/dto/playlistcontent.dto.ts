import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { ContentDTO } from 'src/content/dto/content.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class PlaylistContentDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер плейлиста',
  })
  @IsInt()
  @IsPositive()
  playlistId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер контенета',
  })
  @IsInt()
  @IsPositive()
  contentId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'Порядковый номер контента в плейлисте',
  })
  @IsInt()
  @IsPositive()
  ordinalNumber: number;

  @ApiProperty({ example: '1', description: 'Длительность контента' })
  @IsNumber()
  duration: number;

  playlist?: PlaylistDTO;

  user?: UserDTO;

  content?: ContentDTO;
}
