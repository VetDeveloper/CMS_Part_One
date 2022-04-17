import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { EventDTO } from './dto/event.dto';
import { Event } from './event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService extends TypeOrmCrudService<EventDTO> {
  constructor(public repo: EventRepository) {
    super(repo);
  }
}
