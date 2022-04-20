import { PickType } from '@nestjs/swagger';
import { EventDTO } from './event.dto';

export class ResponseEventDTO extends PickType(EventDTO, [
  'id',
  'name',
  'userId',
  'updatedAt',
  'createdAt',
]) {}
