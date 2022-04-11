import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ScreenDTO } from 'src/screen/dto/screen.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class EventDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @Exclude()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  userId: number;

  @ApiProperty({
    example: 'Встреча выпускников',
    description: 'Название мероприятия',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

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

  screens: ScreenDTO[];
}
