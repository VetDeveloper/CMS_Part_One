import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Event } from 'src/event/event.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { User } from 'src/user/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  eventId: number;

  @Column({ type: 'int' })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.screens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Event, (ev) => ev.screens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event?: Event;

  @OneToOne(() => Playlist, (playlist) => playlist.screen)
  playlist?: Playlist;
}
