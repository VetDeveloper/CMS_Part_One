import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentRepository } from './content.repository';
import { ContentDTO } from './dto/content.dto';

import { v4 } from 'uuid';

import * as AWS from 'aws-sdk';
import { GetPersistentUrlDTO } from './dto/get-persistent-url.dto';
import { ConfigService as CS } from '@nestjs/config';
import { CreateFileDTO } from './dto/create-file.dto';
import { ResponseUrlDTO } from './dto/reponse-url.dto';
import { DeleteFileDTO } from './dto/delete-file.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentDTO> {
  constructor(public repo: ContentRepository, private configService: CS) {
    super(repo);
  }

  async getPersistentUrl(dto: GetPersistentUrlDTO): Promise<ResponseUrlDTO> {
    const hash: string = v4();
    const newKey: string = hash + dto.fileName;

    const s3 = new AWS.S3({
      endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
    });

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
      Key: newKey,
      Expires: this.configService.get('PERSIGNED_URL_EXPIRES_TIME'),
    });

    return {
      signedUrl: signedUrl,
      key: newKey,
    };
  }

  async createOneFile(
    contentId: number,
    dto: CreateFileDTO,
  ): Promise<ContentDTO> {
    try {
      const s3 = new AWS.S3({
        endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
      });

      const content: ContentDTO = await this.repo.findOneOrFail(contentId);
      let keys = content.keys;
      keys.push(dto.key);

      return await this.repo.save({
        ...content,
        keys: keys,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteOneFile(
    contentId: number,
    dto: DeleteFileDTO,
  ): Promise<ContentDTO> {
    try {
      const s3 = new AWS.S3({
        endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
      });

      const content: ContentDTO = await this.repo.findOneOrFail(contentId);
      const keys = content.keys;
      const keysUpdated: string[] = keys.filter((key) => {
        return key != dto.key;
      });

      await s3
        .deleteObject({
          Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
          Key: dto.key,
        })
        .promise();

      return await this.repo.save({ ...content, keys: keysUpdated });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
