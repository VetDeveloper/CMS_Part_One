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
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @Column({
    type: 'varchar',
    length: 35,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @Column({
    type: 'varchar',
  })
  password: string;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания пользователя',
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления пользователя',
  })
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
