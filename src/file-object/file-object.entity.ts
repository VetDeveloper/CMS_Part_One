import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Content } from 'src/content/content.entity';
import {
  BeforeRemove,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Orientation } from './types/orientation.enum';

@Entity()
@Unique(['key'])
export class FileObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  contentId: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'enum', enum: Orientation, nullable: true })
  orientation: Orientation | null;

  @Column({ type: 'int', nullable: true })
  width: number | null;

  @Column({ type: 'int', nullable: true })
  height: number | null;

  @ManyToOne(() => Content, (content) => content.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contentId' })
  content?: Content;
}
