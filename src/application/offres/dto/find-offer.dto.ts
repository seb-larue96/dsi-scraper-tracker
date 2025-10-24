import { ApiProperty } from "@nestjs/swagger";

export class FindOfferDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    key: string;

    @ApiProperty()
    destination?: string;
    
    @ApiProperty()
    hotel?: string;
    
    @ApiProperty()
    type?: string;
    
    @ApiProperty()
    prix?: string;

    @ApiProperty()
    urlScraped: string;
    
    @ApiProperty()
    urlSource?: string;
    
    @ApiProperty()
    dateScraping: string;
}