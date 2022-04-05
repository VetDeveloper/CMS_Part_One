import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
require('dotenv').config();
import { S3 } from 'aws-sdk';

@Injectable()
export class ContentService extends TypeOrmCrudService<Content> {
  constructor(@InjectRepository(Content) repo: Repository<Content>) {
    super(repo);
  }

  async createOneFile(
    contentId: number,
    imageBuffer: Buffer,
    fileName: string,
  ) {
    try {
      const s3 = new S3({
        endpoint: 'https://storage.yandexcloud.net',
      });

      const content: Content = await this.repo.findOneOrFail(contentId);

      let links = content.link;
      links.push('https://storage.yandexcloud.net/file.storage/' + fileName);

      this.repo.save({
        ...content,
        link: links,
      });

      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
          Body: imageBuffer,
          Key: fileName,
        })
        .promise();

      return uploadResult.Location;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteOneFile(contentId: number, fileName: string) {
    try {
      const s3 = new S3({
        endpoint: 'https://storage.yandexcloud.net',
      });

      const content: Content = await this.repo.findOneOrFail(contentId);
      const links = content.link;
      const linksUpdated: string[] = links.filter((url) => {
        return !url.includes(fileName);
      });

      this.repo.save({ ...content, link: linksUpdated });

      await s3
        .deleteObject({
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
          Key: fileName,
        })
        .promise();

      return { ...content, link: linksUpdated };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
