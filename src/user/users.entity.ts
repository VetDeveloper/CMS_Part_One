import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Content } from 'src/content/content.entity';
import { Event } from 'src/event/event.entity';
import { PlaylistContent } from 'src/playlistcontent/playlistcontent.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Screen } from 'src/screen/screen.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }

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
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Event, (ev) => ev.user)
  events?: Event[];

  @OneToMany(() => Screen, (sc) => sc.user)
  screens?: Screen[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists?: Playlist[];

  @OneToMany(() => Content, (content) => content.user)
  contents?: Content[];

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist,
  )
  playlistContents?: PlaylistContent[];
}
