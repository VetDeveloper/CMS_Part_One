import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Playlist } from 'src/playlist/playlist.entity';

define(Playlist, (faker: typeof Faker) => {
  const playlist = new Playlist();
  return playlist;
});
