import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class PaginationDTO {
    @ApiProperty({default: 1})
    @IsNumber()
    page: number;

    @ApiProperty({default: 5})
    @IsNumber()
    limit: number;
}