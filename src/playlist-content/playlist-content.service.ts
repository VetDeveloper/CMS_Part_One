import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { PlaylistContent } from './playlist-content.entity';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContent> {
  constructor(
    @InjectRepository(PlaylistContent) repo: Repository<PlaylistContent>,
  ) {
    super(repo);
  }
}
