import { PickType } from '@nestjs/swagger';
import { ContentModel } from './content.dto';

export class ResponseContentDTO extends PickType(ContentModel, [
  'id',
  'name',
  'userId',
  'createdAt',
  'updatedAt',
]) {}
