import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ContentDTO } from 'src/content/dto/content.dto';
import { EventDTO } from 'src/event/dto/event.dto';
import { PlaylistContentDTO } from 'src/playlist-content/dto/playlist-content.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { ScreenDTO } from 'src/screen/dto/screen.dto';

export class UserDTO {
  @Exclude()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания пользователя',
  })
  created_at: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления пользователя',
  })
  updated_at: Date;

  events: EventDTO[];

  screens: ScreenDTO[];

  playlists: PlaylistDTO[];

  contents: ContentDTO[];

  playlistContents: PlaylistContentDTO[];
}
