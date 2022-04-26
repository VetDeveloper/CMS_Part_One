import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentRepository } from './content.repository';
import { ContentDTO } from './dto/content.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentDTO> {
  constructor(public repo: ContentRepository) {
    super(repo);
  }
}
