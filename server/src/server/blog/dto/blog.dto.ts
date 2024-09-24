import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BlogDTO {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;
}