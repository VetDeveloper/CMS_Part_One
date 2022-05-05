import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  isString,
  IsString,
} from 'class-validator';
import { ContentModel } from 'src/content/dto/content.dto';
import { EventDTO } from 'src/event/dto/event.dto';
import { PlaylistContentModel } from 'src/playlist-content/dto/playlist-content.dto';
import { PlaylistModel } from 'src/playlist/dto/playlist.dto';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { ScreenModel } from 'src/screen/dto/screen.dto';

export class UserModel {
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
  @IsOptional()
  password: string | null;

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

  // @IsOptional()
  // @Exclude()
  // currentHashedRefreshToken: string | null;

  events?: EventDTO[];

  screens?: ScreenModel[];

  playlists?: PlaylistModel[];

  contents?: ContentModel[];

  playlistContents?: PlaylistContentModel[];

  refreshTokens?: RefreshToken[];
}
