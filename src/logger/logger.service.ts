import { Injectable } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class LoggerService {
    constructor(private readonly em: EntityManager) {}

    async log(level: 'info' | 'error', message: string, context?: string, stack?: string) {
        const log = new Log();
        log.level = level;
        log.message = message;
        log.context = context;
        log.stack = stack;
        log.timestamp = new Date();

        this.em.persist(log);
        await this.em.flush();
    }

    async info(message: string, context?: string) {
        await this.log('info', message, context);
    }

    async error(message: string, context?: string, stack?: string) {
        await this.log('error', message, context, stack);
    }
}
