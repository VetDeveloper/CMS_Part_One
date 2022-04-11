import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from 'src/playlist/playlist.entity';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Repository } from 'typeorm';
import { ScreenDTO } from './dto/screen.dto';
import { Screen } from './screen.entity';

@Injectable()
export class ScreenService extends TypeOrmCrudService<ScreenDTO> {
  constructor(@InjectRepository(Screen) repo: Repository<Screen>) {
    super(repo);
  }
}
