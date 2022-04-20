import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistContent } from './playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';
import { PlaylistContentReposityry } from './playlist-content.repository';

@Module({
  controllers: [PlaylistContentController],
  providers: [PlaylistContentService],
  imports: [TypeOrmModule.forFeature([PlaylistContentReposityry])],
  exports: [PlaylistContentService],
})
export class PlaylistContentModule {}
