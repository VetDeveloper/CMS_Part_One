import { EntityRepository, Repository } from "typeorm";
import { FileObject } from "./file-object.entity";

@EntityRepository(FileObject)
export class FileObjectRepository extends Repository<FileObject> {}
