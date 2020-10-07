import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractionLog } from '../models/extraction-log.dto';
import { ExtractionLogsService } from './extraction-logs.service';

@Controller('extraction-logs')
export class ExtractionLogsController {
    constructor(
        private extractionLogService: ExtractionLogsService,
    ) { }

    @Get()
    @UseGuards(AuthGuard())
    public getExtractionLogs(
    ): Promise<ExtractionLog[]> {
        return this.extractionLogService.getExtractionLogs();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    public getExtractionLogById(
        @Param() id: string,
    ): Promise<ExtractionLog> {
        return this.extractionLogService.getExtractionLogById(id);
    }

    @Post('add-extraction-log')
    @UseGuards(AuthGuard())
    public addExtractionLog(
        @Body(ValidationPipe) body: ExtractionLog
    ): Promise<string> {
        const extractionLog = body;
        return this.extractionLogService.addNewExtractionLog(extractionLog);
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
