import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OffresService } from '../offres/offres.service';
import { LoggerService } from 'src/logger/logger.service';
import { FeatureFlags } from 'src/config/feature-flags.config';
@Injectable()
export class TasksService {
    private readonly context = TasksService.name;

    constructor(private readonly offresService: OffresService, private readonly logger: LoggerService) {}

    @Cron(CronExpression.EVERY_HOUR, { disabled: !FeatureFlags.FETCH_AND_STORE_CRON })
    async cronFetchAndStore() {
        await this.logger.info('Starting scheduled fetchAndStore()', this.context);
        try {
            await this.offresService.fetchAndStore();
            await this.logger.info('fetchAndStore() completed successfully', this.context);
        } catch (error) {
            await this.logger.error(
                'Error running fetchAndStore()',
                this.context,
                error.stack || error.toString()
            );
        }
    }
}
