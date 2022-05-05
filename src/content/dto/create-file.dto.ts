import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Orientation } from 'src/file-object/types/orientation.enum';
import { ResponseUrlDTO } from './reponse-url.dto';

export class CreateFileDTO extends PickType(ResponseUrlDTO, ['key']) {
  @ApiProperty({
    example: 'portrait',
    description: 'Ориентация (portrait, landscape)',
  })
  @IsOptional()
  @IsString()
  @IsEnum(Orientation)
  orientation?: Orientation;

  @ApiProperty({
    example: '1080',
    description: 'Ширина (пикс)',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  width?: number;

  @ApiProperty({
    example: '720',
    description: 'Высота (пикс)',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  height?: number;
}
