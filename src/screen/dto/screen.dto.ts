import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { EventDTO } from 'src/event/dto/event.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class ScreenDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @Exclude()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер мероприятия',
  })
  eventId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
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

  user: UserDTO;

  event: EventDTO;

  playlist: PlaylistDTO;
}
