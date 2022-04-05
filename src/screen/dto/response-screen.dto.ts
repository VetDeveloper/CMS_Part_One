import { ApiProperty } from '@nestjs/swagger';

export class responseScreenDTO {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  readonly id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер мероприятия',
  })
  readonly eventId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  readonly userId: number;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания пользователя',
  })
  readonly created_at: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления пользователя',
  })
  readonly updated_at: Date;
}
