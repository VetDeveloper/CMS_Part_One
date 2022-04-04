import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/users.entity';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';

@Entity()
export class Content {
  @ApiProperty({ example: '1', description: 'Идентификационный номер' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({ example: 'Фото кошечки', description: 'Название контента' })
  @Column({
    type: 'varchar',
    length: 40,
  })
  name: string;

  @ApiProperty({
    example:
      'https://sun9-58.userapi.com/impf/c850332/d0267/bTMrh9k4U2g.jpg?size=640x800&type=album',
    description: 'Ссылка на контент',
  })
  @Column({ type: 'varchar', array: true, default: () => "'[]'" })
  link: Array<string>;

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
