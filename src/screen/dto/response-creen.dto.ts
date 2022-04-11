import { PickType } from '@nestjs/swagger';
import { ScreenDTO } from './screen.dto';

export class ResponseScreenDTO extends PickType(ScreenDTO, [
  'userId',
  'eventId',
  'created_at',
  'updated_at',
]) {}
