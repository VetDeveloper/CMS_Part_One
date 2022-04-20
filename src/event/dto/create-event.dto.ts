import { ApiProperty, PickType } from '@nestjs/swagger';
import { EventDTO } from './event.dto';

export class CreateEventDTO extends PickType(EventDTO, ['name']) {}
