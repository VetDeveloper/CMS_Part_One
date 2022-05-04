import { PartialType, PickType } from '@nestjs/swagger';
import { CreateContentDTO } from './create-content.dto';

export class UpdateContentDTO extends PartialType(PickType(CreateContentDTO, ['name'])) {}
