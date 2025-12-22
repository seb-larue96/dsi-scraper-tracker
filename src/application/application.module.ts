import { Module } from "@nestjs/common";
import { OffresModule } from "./offres/offres.module";
import { DestinationsModule } from './destinations/destinations.module';
import { HotelsModule } from './hotels/hotels.module';
import { OffresDatesModule } from './offres_dates/offres_dates.module';
import { OffresPrixHistoriqueModule } from './offres_prix_historique/offres_prix_historique.module';

@Module({
    imports: [OffresModule, DestinationsModule, HotelsModule, OffresDatesModule, OffresPrixHistoriqueModule],
    exports: [OffresModule]
})
export class ApplicationModule {}