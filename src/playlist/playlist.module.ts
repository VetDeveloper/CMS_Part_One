import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';

@Module({
  providers: [PlaylistService],
  controllers: [PlaylistController],
  imports: [TypeOrmModule.forFeature([Playlist])],
  exports: [PlaylistService],
})
export class PlaylistModule {}
