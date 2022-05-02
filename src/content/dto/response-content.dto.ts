import { PickType } from '@nestjs/swagger';
import { ContentDTO } from './content.dto';

export class ResponseContentDTO extends PickType(ContentDTO, [
  'id',
  'keys',
  'name',
  'userId',
  'createdAt',
  'updatedAt',
]) {}
