import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Content } from 'src/content/content.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { User } from 'src/user/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PlaylistContent {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @PrimaryColumn()
  playlistId: number;

  @PrimaryColumn()
  contentId: number;

  @Column({ type: 'int' })
  userId: number;

  @PrimaryColumn()
  ordinalNumber: number;

  @Column({ type: 'float' })
  duration: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistContents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlistId' })
  playlist: Playlist;

  @ManyToOne(() => User, (user) => user.playlistContents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Content, (content) => content.playlistContents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contentId' })
  content: Content;
}
