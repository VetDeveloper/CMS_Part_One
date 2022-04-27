import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentRepository } from './content.repository';
import { ContentDTO } from './dto/content.dto';

import { v4 } from 'uuid';

import * as AWS from 'aws-sdk';
import { CreateFileDTO } from './dto/create-file.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentDTO> {
  constructor(public repo: ContentRepository) {
    super(repo);
  }

  async saveFileInCloud(dto: CreateFileDTO) {
    const hash: string = v4();
    const newKey: string = hash + dto.fileName;

    AWS.config.update({
      region: 'eu-central-1',
      accessKeyId: 'YCAJEd2iIB7xJGOvAkmNllJIg',
      secretAccessKey: 'YCNxZNtXFWUZEM6wDF_ZWLPXYqWBGYYVusRS9DNK',
    });

    const s3 = new AWS.S3({
      endpoint: 'https://storage.yandexcloud.net',
      region: 'eu-central-1',
      accessKeyId: 'YCAJEd2iIB7xJGOvAkmNllJIg',
      secretAccessKey: 'YCNxZNtXFWUZEM6wDF_ZWLPXYqWBGYYVusRS9DNK',
      signatureVersion: 'v4',
    });

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: 'file.storage',
      Key: newKey,
      Expires: 600,
    });

    return {
      signedUrl: signedUrl,
      key: newKey,
    };
  }
}
