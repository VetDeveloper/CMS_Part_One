import { ApiProperty } from '@nestjs/swagger';
import { Content } from 'src/content/content.entity';
import { Event } from 'src/event/event.entity';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Screen } from 'src/screen/screen.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 35,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => Event, (ev) => ev.user)
  events: Event[];

  @OneToMany(() => Screen, (sc) => sc.user)
  screens: Screen[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist,
  )
  playlistContents: PlaylistContent[];
}
