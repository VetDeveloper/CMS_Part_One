import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService, Override } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistContentDTO } from './dto/create-playlist-content.dto';
import { PlaylistContent } from './playlist-content.entity';
import { PlaylistContentReposityry } from './playlist-content.repository';

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContent> {
  constructor(public repo: PlaylistContentReposityry) {
    super(repo);
  }

  @Override('createOneBase')
  async createOnePC(dto: CreatePlaylistContentDTO, userId: number) {
    const alreadyExists = await this.repo.findOne({
      where: {
        playlistId: dto.playlistId,
        ordinalNumber: dto.ordinalNumber,
      },
    });

    if (alreadyExists) {
      throw new BadRequestException('Повторяющиеся значения');
    }

    return this.repo.save({ ...dto, userId: userId });
  }
}
