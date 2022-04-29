import { ApiProperty } from "@nestjs/swagger";

export class TokenPayload {
    
    @ApiProperty({description: 'id', example: '1'})
    id: number

    @ApiProperty({description: 'email', example: 'sashkatawer228@gmail.com'})
    email: string
}