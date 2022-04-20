import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { ContentRepository } from './content.repository';
import { ContentDTO } from './dto/content.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentDTO> {
  constructor(public repo: ContentRepository) {
    super(repo);
  }
}
