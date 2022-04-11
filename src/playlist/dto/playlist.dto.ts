import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { PlaylistContentDTO } from 'src/playlist-content/dto/playlist-content.dto';
import { ScreenDTO } from 'src/screen/dto/screen.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class PlaylistDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @Exclude()
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификационный номер экрана' })
  @IsNumber()
  screenId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsNumber()
  userId: number;

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

  screen: ScreenDTO;

  user: UserDTO;

  playlistContents: PlaylistContentDTO[];
}
