import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { ContentModel } from './content.dto';

export class CreateContentDTO extends PickType(ContentModel, ['name']) {}
