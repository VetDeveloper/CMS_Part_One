import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsPositive,
  isString,
  IsString,
} from 'class-validator';
import { ContentDTO } from 'src/content/dto/content.dto';
import { EventDTO } from 'src/event/dto/event.dto';
import { PlaylistContentDTO } from 'src/playlistcontent/dto/playlistcontent.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { ScreenDTO } from 'src/screen/dto/screen.dto';

export class UserDTO {
  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  password: string;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания пользователя',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления пользователя',
  })
  updatedAt: Date;

  events?: EventDTO[];

  screens?: ScreenDTO[];

  playlists?: PlaylistDTO[];

  contents?: ContentDTO[];

  playlistContents?: PlaylistContentDTO[];
}
