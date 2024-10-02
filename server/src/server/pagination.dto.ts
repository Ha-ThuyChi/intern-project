import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class PaginationDTO {
    @ApiProperty({default: 1})
    page: number;

    @ApiProperty({default: 5})
    limit: number;
}