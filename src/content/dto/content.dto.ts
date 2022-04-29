import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { PlaylistContentDTO } from 'src/playlist-content/dto/playlist-content.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class ContentDTO {

  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 'Фото кошечки', description: 'Название контента' })
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: [
      'https://sun9-58.userapi.com/impf/c850332/d0267/bTMrh9k4U2g.jpg?size=640x800&type=album',
    ],
    description: 'Мыссив с ссылками на конкретный контент',
  })
  @IsString({ each: true })
  @IsArray()
  link: Array<string>;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания контента',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления контента',
  })
  updatedAt: Date;

  user?: UserDTO;

  playlistContents?: PlaylistContentDTO[];
}
