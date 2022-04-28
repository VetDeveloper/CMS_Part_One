import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ResponseUrlDTO } from './reponse-url.dto';

export class CreateFileDTO extends PickType(ResponseUrlDTO, ['key']) {}
