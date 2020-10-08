import { Module } from '@nestjs/common';
import { ExtractionLogsService } from './extraction-logs.service';
import { ExtractionLogsController } from './extraction-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractionLogEntity } from '../entities/extraction-log.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [ExtractionLogsService],
  controllers: [ExtractionLogsController],
  imports: [
    TypeOrmModule.forFeature([ExtractionLogEntity]),
    AuthModule,
  ],
  exports: [TypeOrmModule]
})
export class ExtractionLogsModule { }
