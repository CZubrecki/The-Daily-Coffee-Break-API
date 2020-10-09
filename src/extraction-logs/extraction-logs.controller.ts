import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { ExtractionLogEntity } from 'src/entities/extraction-log.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ExtractionLog } from '../models/extraction-log.dto';
import { ExtractionLogsService } from './extraction-logs.service';

@Controller('extraction-logs')
export class ExtractionLogsController {
    constructor(
        private extractionLogService: ExtractionLogsService,
    ) { }

    @Get('')
    @UseGuards(AuthGuard())
    public getExtractionLogsByOwnerId(
        @User() user: UserEntity,
    ): Promise<ExtractionLogEntity[]> {
        return this.extractionLogService.getExtractionLogs(user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    public getExtractionLogById(
        @Param() id: string,
    ): Promise<ExtractionLogEntity> {
        return this.extractionLogService.getExtractionLogById(id);
    }

    @Post('add-extraction-log')
    @UseGuards(AuthGuard())
    public addExtractionLog(
        @User() user: UserEntity,
        @Body(ValidationPipe) body: ExtractionLog
    ): Promise<string> {
        const extractionLog = body;
        return this.extractionLogService.addNewExtractionLog(extractionLog, user);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    public deleteExtractionLog(
        @Param() id: string,
    ): Promise<void> {
        this.extractionLogService.deleteExtractionLog(id);
        return;
    }
}
