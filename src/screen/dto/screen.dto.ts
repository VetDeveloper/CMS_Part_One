import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { EventDTO } from 'src/event/dto/event.dto';
import { PlaylistDTO } from 'src/playlist/dto/playlist.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class ScreenDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер мероприятия',
  })
  @IsInt()
  @IsPositive()
  eventId: number;

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

  user?: UserDTO;

  event?: EventDTO;

  playlist?: PlaylistDTO;
}
