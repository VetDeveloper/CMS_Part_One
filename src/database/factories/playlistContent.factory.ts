import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';

define(PlaylistContent, (faker: typeof Faker) => {
  const playlistContent = new PlaylistContent();

  const duration = faker.random.number();

  playlistContent.duration = duration;

  return playlistContent;
});
