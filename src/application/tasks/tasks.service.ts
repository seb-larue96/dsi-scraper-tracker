import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OffresService } from '../offres/offres.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class TasksService {
    private readonly context = TasksService.name;

    constructor(
        private readonly offresService: OffresService, 
        private readonly logger: LoggerService, 
        private readonly configService: ConfigService
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    async cronFetchAndStore() {
        const isEnabled = this.configService.get<boolean>('featureFlags.FETCH_AND_STORE_CRON');

        if (!isEnabled) {
            await this.logger.info('cronFetchAndStore skipped (feature flag disabled)',this.context);
            return;
        }

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
