import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ResponsePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService extends TypeOrmCrudService<Playlist> {
  constructor(@InjectRepository(Playlist) repo: Repository<Playlist>) {
    super(repo);
  }

  async createOneByScreen(dto: ResponsePlaylistDto): Promise<void> {
    this.repo.save(dto);
  }
}
