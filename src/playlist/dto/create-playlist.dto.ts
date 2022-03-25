import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  @ApiProperty({ example: '1', description: 'Идентификационный номер экрана' })
  readonly screenId: number;
}
