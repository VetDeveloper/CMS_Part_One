import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPersistentUrlDTO {
  @ApiProperty({
    example: 'Cat.jpg',
    description: 'Название файла с расширением',
  })
  @IsString()
  fileName: string;
}
