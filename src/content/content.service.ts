import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { FileObjectService } from 'src/file-object/file-object.service';
import { FileObject } from 'src/file-object/file-object.entity';
import { Content } from './content.entity';
import { ResponseFileObject } from 'src/file-object/dto/response-file-object.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentDTO> {
  constructor(
    public repo: ContentRepository,
    private configService: CS,
    private fileService: FileObjectService,
  ) {
    super(repo);
  }

  async deleteOneContent(id: number): Promise<ContentDTO> {
    const s3 = new AWS.S3({
      endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
    });
    const bucketName: string = this.configService.get('YANDEX_BUCKET_NAME');

    const content: Content = await this.repo.findOneOrFail(id, {
      relations: ['files'],
    });

    for (const file of content.files) {
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: file.key,
        })
        .promise();
    }
    await this.repo.delete(id);
    const { files, ...answ } = content;
    return answ;
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
  ): Promise<ResponseFileObject> {
    await this.repo.findOneOrFail(contentId);
    return await this.fileService.saveOneFile({ ...dto, contentId: contentId });
  }

  async deleteOneFile(contentId: number, dto: DeleteFileDTO) {
    const s3 = new AWS.S3({
      endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
    });

    const content: Content = await this.repo.findOneOrFail(contentId, {
      relations: ['files'],
    });
    const files: FileObject[] = content.files;
    const file = files.find((file) => {
      return file.key === dto.key;
    });

    if (!file) {
      throw new NotFoundException(
        `У контента c ID = ${contentId} нет файла с ключом ${dto.key}`,
      );
    }

    await s3
      .deleteObject({
        Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
        Key: dto.key,
      })
      .promise();

    return await this.fileService.deleteOneFile(dto);
  }
}
