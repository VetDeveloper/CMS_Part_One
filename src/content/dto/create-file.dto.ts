import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFileDTO {
  @ApiProperty({
    example: 'Cat.jpg',
    description: 'Название файла с расширением',
  })
  @IsString()
  fileName: string;
}
