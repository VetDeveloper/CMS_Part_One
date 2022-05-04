import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ResponseUrlDTO } from './reponse-url.dto';

export class CreateFileDTO extends PickType(ResponseUrlDTO, ['key']) {
  @ApiProperty({
    example: 'portrait',
    description: 'Ориентация (portrait, landscape)',
  })
  @IsOptional()
  @IsString()
  @IsIn(['portrait', 'landscape'])
  orientation: string | null;

  @ApiProperty({
    example: '1080',
    description: 'Разрешение',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  resolution: number | null;
}
