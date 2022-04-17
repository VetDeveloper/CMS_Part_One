import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Screen } from 'src/screen/screen.entity';
import { User } from 'src/user/users.entity';
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

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 40,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => Screen, (sc) => sc.event)
  screens?: Screen[];
}
