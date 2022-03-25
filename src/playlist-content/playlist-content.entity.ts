import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер плейлиста',
  })
  @PrimaryColumn()
  playlistId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер контенета',
  })
  @PrimaryColumn()
  contentId: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'Порядковый номер контента в плейлисте',
  })
  @PrimaryColumn()
  ordinalNumber: number;

  @ApiProperty({ example: '1', description: 'Длительность контента' })
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
