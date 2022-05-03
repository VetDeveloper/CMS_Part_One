import { ApiProperty } from "@nestjs/swagger";

export class RefreshDTO {
  @ApiProperty({ description: 'refresh token', example: 'asdasd4dsa6sadsad6' })
  refresh_token: string;

  @ApiProperty({ description: 'Device', example: 'RedmiNote 8 Pro' })
  device: string;
}
