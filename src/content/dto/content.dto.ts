import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { PlaylistContentDTO } from 'src/playlist-content/dto/playlist-content.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class ContentDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  userId: number;

  @ApiProperty({ example: 'Фото кошечки', description: 'Название контента' })
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example:
      'https://sun9-58.userapi.com/impf/c850332/d0267/bTMrh9k4U2g.jpg?size=640x800&type=album',
    description: 'Ссылка на контент',
  })
  @IsString()
  link: string;

  user: UserDTO;

  playlistContents: PlaylistContentDTO[];
}
