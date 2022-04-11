import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/users.entity';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 40,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  link: string;

  @ManyToOne(() => User, (user) => user.contents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist,
  )
  playlistContents: PlaylistContent[];
}
