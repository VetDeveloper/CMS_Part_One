import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistDTO } from './dto/playlist.dto';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService extends TypeOrmCrudService<PlaylistDTO> {
  constructor(@InjectRepository(Playlist) repo: Repository<Playlist>) {
    super(repo);
  }

  async createOneByScreen(dto: CreatePlaylistDto): Promise<void> {
    this.repo.save(dto);
  }
}
