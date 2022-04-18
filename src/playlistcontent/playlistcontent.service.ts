import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { PlaylistContent } from './playlistcontent.entity';
import { PlaylistContentReposityry } from './playlistcontent.repository';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContent> {
  constructor(public repo: PlaylistContentReposityry) {
    super(repo);
  }
}
