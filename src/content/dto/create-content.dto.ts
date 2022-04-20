import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ContentDTO } from './content.dto';

export class CreateContentDTO extends PickType(ContentDTO, ['name', 'link']) {}
