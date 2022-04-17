import { PickType } from '@nestjs/swagger';
import { ScreenDTO } from './screen.dto';

export class ResponseScreenDTO extends PickType(ScreenDTO, [
  'id',
  'userId',
  'eventId',
  'createdAt',
  'updatedAt',
]) {}
