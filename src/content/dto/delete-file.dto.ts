import { PickType } from '@nestjs/swagger';
import { ResponseUrlDTO } from './reponse-url.dto';

export class DeleteFileDTO extends PickType(ResponseUrlDTO, ['key']) {}
