import { EntityRepository, Repository } from 'typeorm';
import { PlaylistContent } from './playlist-content.entity';

@EntityRepository(PlaylistContent)
export class PlaylistContentReposityry extends Repository<PlaylistContent> {}
