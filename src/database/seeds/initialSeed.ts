import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/user/users.entity';
import { Event } from 'src/event/event.entity';
import * as bcrypt from 'bcryptjs';
import { Screen } from 'src/screen/screen.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Content } from 'src/content/content.entity';
import { PlaylistContent } from 'src/playlist-content/playlistcontent.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users: User[] = await factory(User)()
      .map(async (user) => {
        user.password = await bcrypt.hash(user.password, 5);
        return user;
      })
      .createMany(10);

    const events: Event[] = await factory(Event)()
      .map(async (event) => {
        event.user = users[Math.floor(Math.random() * users.length)];
        return event;
      })
      .createMany(12);

    const screens: Screen[] = await factory(Screen)()
      .map(async (screen) => {
        screen.user = users[Math.floor(Math.random() * users.length)];
        screen.event = events[Math.floor(Math.random() * events.length)];
        return screen;
      })
      .createMany(20);

    const playlists: Playlist[] = [];

    for (let i in new Array(screens.length).fill(1).map((a, i) => i)) {
      playlists.push(
        await factory(Playlist)()
          .map(async (playlist) => {
            playlist.user = users[Math.floor(Math.random() * users.length)];
            playlist.screen = screens[i];
            return playlist;
          })
          .create(),
      );
    }

    const contents: Content[] = await factory(Content)()
      .map(async (content) => {
        content.user = users[Math.floor(Math.random() * users.length)];
        return content;
      })
      .createMany(40);

    let ornum = 1;

    for (let i in new Array(playlists.length).fill(1).map((a, i) => i)) {
      for (let j in new Array(contents.length).fill(1).map((a, i) => i)) {
        await factory(PlaylistContent)()
          .map(async (playlistContent) => {
            playlistContent.user =
              users[Math.floor(Math.random() * users.length)];
            playlistContent.playlist = playlists[i];
            playlistContent.content = contents[j];
            playlistContent.ordinalNumber = ornum;
            return playlistContent;
          })
          .create();
        ornum = ornum + 1;
      }
      ornum = 1;
    }
  }
}
