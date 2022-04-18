import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Event } from 'src/event/event.entity';
import { PlaylistContent } from 'src/playlistcontent/playlistcontent.entity';
import { Screen } from 'src/screen/screen.entity';
import { User } from 'src/user/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  screenId: number;

  @Column({ type: 'int' })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Screen, (scr) => scr.playlist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'screenId' })
  screen?: Screen;

  @ManyToOne(() => User, (user) => user.playlists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist,
  )
  playlistContents?: PlaylistContent[];
}
