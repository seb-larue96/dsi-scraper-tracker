import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './config/mikro-orm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ApplicationModule } from './application/application.module';
import { LoggerService } from './logger/logger.service';
import { Log } from './logger/entities/log.entity';
import { TasksService } from './application/tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([Log]),
    ScheduleModule.forRoot(),
    HttpModule,
    ApplicationModule
  ],
  providers: [LoggerService, TasksService],
  exports: [LoggerService]
})
export class AppModule {}
