import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentController } from './playlistcontent.controller';
import { PlaylistContent } from './playlistcontent.entity';
import { PlaylistContentService } from './playlistcontent.service';
import { PlaylistContentReposityry } from './playlistcontent.repository';

@Module({
  controllers: [PlaylistContentController],
  providers: [PlaylistContentService],
  imports: [TypeOrmModule.forFeature([PlaylistContentReposityry])],
  exports: [PlaylistContentService],
})
export class PlaylistContentModule {}
