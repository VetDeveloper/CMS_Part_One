import { PickType } from '@nestjs/swagger';
import { ScreenModel } from './screen.dto';

export class ResponseScreenDTO extends PickType(ScreenModel, [
  'id',
  'userId',
  'eventId',
  'createdAt',
  'updatedAt',
]) {}
