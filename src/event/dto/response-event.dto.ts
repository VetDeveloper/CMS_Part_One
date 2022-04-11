import { PickType } from '@nestjs/swagger';
import { EventDTO } from './event.dto';

export class ResponseEventDTO extends PickType(EventDTO, [
  'name',
  'userId',
  'updated_at',
  'created_at',
]) {}
