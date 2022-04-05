import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateContentDTO {
  @ApiProperty({ example: 'Фото кошечки', description: 'Название контента' })
  @IsString()
  @MaxLength(40)
  readonly name: string;

  @ApiProperty({
    example:
      '[https://sun9-58.userapi.com/impf/c850332/d0267/bTMrh9k4U2g.jpg?size=640x800&type=album]',
    description: 'Ссылки на контент',
  })
  @IsString()
  readonly link: Array<string>;
}
