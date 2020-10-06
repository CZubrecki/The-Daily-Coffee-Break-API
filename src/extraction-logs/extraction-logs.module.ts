import { Module } from '@nestjs/common';
import { ExtractionLogsService } from './extraction-logs.service';
import { ExtractionLogsController } from './extraction-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractionLog } from './extraction-log.entity';

@Module({
  providers: [ExtractionLogsService],
  controllers: [ExtractionLogsController],
  imports: [TypeOrmModule.forFeature([ExtractionLog])],
  exports: [TypeOrmModule]
})
export class ExtractionLogsModule { }
