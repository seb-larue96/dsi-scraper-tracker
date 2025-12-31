import { ApiProperty } from "@nestjs/swagger";

export class FindOfferDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    key: string;

    @ApiProperty()
    duplicateKey: string;

    @ApiProperty()
    destination: {
        id: number;
        pays?: string;
        ville?: string;
        depart_retour?: string;
    }[];
    
    @ApiProperty()
    hotel: {
        id: number;
        nom?: string;
        etoiles?: number;
    }[];

    @ApiProperty()
    offreDate: {
        id: number;
        date_depart?: string;
        date_retour?: string;
        nb_jours: string;
        mois_voyage?: string;
        annee_voyage?: string;
    }[];

    @ApiProperty()
    offrePrixHistorique: {
        id: number;
        prix: string;
        devise: string;
        date_scraped: string;
    }[];
    
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