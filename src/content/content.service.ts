import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(@InjectRepository(Content) repo: Repository<Content>) {
    super(repo);
  }
}
