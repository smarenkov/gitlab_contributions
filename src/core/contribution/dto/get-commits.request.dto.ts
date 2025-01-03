import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetCommitsRequestDto {
    @ApiProperty({ example: 'smarenkov' })
    username: string;

    @ApiProperty({ example: 'simon.marenkov@gmail.com' })
    author: string;
}
