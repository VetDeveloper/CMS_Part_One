import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEventDTO {
  @ApiProperty({
    example: 'Встреча выпускников',
    description: 'Название мероприятия',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly name: string;
}
