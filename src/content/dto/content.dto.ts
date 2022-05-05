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
import { FileObject } from 'src/file-object/file-object.entity';
import { PlaylistContentModel } from 'src/playlist-content/dto/playlist-content.dto';
import { UserModel } from 'src/user/dto/user.dto';

export class ContentModel {

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
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания контента',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления контента',
  })
  updatedAt: Date;

  user?: UserModel;

  playlistContents?: PlaylistContentModel[];

  files?: FileObject[];
}
