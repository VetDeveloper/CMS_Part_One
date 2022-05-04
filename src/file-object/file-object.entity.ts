import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import { Content } from "src/content/content.entity";
import { BeforeRemove, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['key'])
export class FileObject {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  contentId: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar', nullable: true })
  orientation: string | null;

  @Column({ type: 'int', nullable: true })
  resolution: number | null;

  @ManyToOne(() => Content, (content) => content.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contentId' })
  content?: Content;
}
