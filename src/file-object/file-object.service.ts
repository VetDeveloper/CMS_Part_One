import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConfigService as CS } from '@nestjs/config';
import { FileObject } from './file-object.entity';
import { FileObjectRepository } from './file-object.repository';
import { CreateFileDTO } from 'src/content/dto/create-file.dto';
import { DeleteFileDTO } from 'src/content/dto/delete-file.dto';
import { Override } from '@nestjsx/crud';

@Injectable()
export class FileObjectService extends TypeOrmCrudService<FileObject> {
  constructor(public repo: FileObjectRepository) {
    super(repo);
  }

  async saveOneFile(dto: CreateFileDTO & {contentId: number}) {
    return await this.repo.save(dto);
  }

  async deleteOneFile(dto: DeleteFileDTO) {
    return await this.repo.delete({key: dto.key})
  }
}
