import {
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/users.entity';
import { PlaylistContent } from 'src/playlist-content/playlist-content.entity';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { FileObject } from 'src/file-object/file-object.entity';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';

@Entity()
export class Content {
  @BeforeRemove()
  async removeAllFiles() {
    const configService: ConfigService = new ConfigService();
    const s3 = new AWS.S3({
      endpoint: configService.get('AWS_SDK_ENDPOINT_NAME'),
    });
    const bucketName: string = configService.get('YANDEX_BUCKET_NAME');

    const files: FileObject[] = this.files

    console.log(files)

    for (const file of this.files) {
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: file.key,
        })
        .promise();
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 40,
  })
  name: string;

  // @Column({ type: 'varchar', array: true, default: () => "'{}'" })
  // keys: Array<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.contents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist,
  )
  playlistContents?: PlaylistContent[];

  @OneToMany(() => FileObject, (fileObj) => fileObj.content)
  files?: FileObject[];
}
