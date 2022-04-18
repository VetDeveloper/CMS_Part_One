import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { PlaylistContentDTO } from 'src/playlist-content/dto/playlistcontent.dto';
import { ScreenDTO } from 'src/screen/dto/screen.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class PlaylistDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификационный номер экрана' })
  @IsInt()
  @IsPositive()
  screenId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsInt()
  @IsPositive()
  userId: number;

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

  screen?: ScreenDTO;

  user?: UserDTO;

  playlistContents?: PlaylistContentDTO[];
}
