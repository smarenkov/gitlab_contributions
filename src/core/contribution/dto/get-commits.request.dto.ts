import { ApiProperty } from '@nestjs/swagger';

export class GetCommitsRequestDto {
    @ApiProperty({ example: 'smarenkov' })
    username: string;

    @ApiProperty({ example: 'simon.marenkov@gmail.com' })
    author: string;
}
