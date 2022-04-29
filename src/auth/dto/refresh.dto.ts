import { ApiProperty } from "@nestjs/swagger";

export class RefreshDTO {
  @ApiProperty({ description: 'refresh token', example: 'asdasd4dsa6sadsad6' })
  refresh_token: string;
}
