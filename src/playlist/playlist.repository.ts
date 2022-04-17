import { EntityRepository, Repository } from 'typeorm';
import { Playlist } from './playlist.entity';

@EntityRepository(Playlist)
export class PlaylistReposityry extends Repository<Playlist> {}
