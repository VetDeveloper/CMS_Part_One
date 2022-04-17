import { EntityRepository, Repository } from 'typeorm';
import { PlaylistContent } from './playlistcontent.entity';

@EntityRepository(PlaylistContent)
export class PlaylistContentReposityry extends Repository<PlaylistContent> {}
