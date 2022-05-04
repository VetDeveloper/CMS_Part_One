import { ApiProperty } from "@nestjs/swagger";

export class ResponseFileObject {
  @ApiProperty({ example: 1, description: 'Индентификационный номер' })
  id: number;
  @ApiProperty({ example: 1, description: 'Индентификационный номер контента' })
  contentId: number;
  @ApiProperty({
    example: '79400090-ef7f-4db7-ad2f-b02b8a930bf9Test15.jpg',
    description: 'Уникальный ключ объекта в облаке',
  })
  key: string;
  @ApiProperty({
    example: 'landscape',
    description: 'Ориентация (portrait, landscape)',
  })
  orientation: string | null;
  @ApiProperty({
    example: '1080',
    description: 'Разрешение',
  })
  resolution: number | null;
}
