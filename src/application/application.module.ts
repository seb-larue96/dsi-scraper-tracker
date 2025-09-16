import { Module } from "@nestjs/common";
import { OffresModule } from "./offres/offres.module";

@Module({
    imports: [OffresModule],
    exports: [OffresModule]
})
export class ApplicationModule {}