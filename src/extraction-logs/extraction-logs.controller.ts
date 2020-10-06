import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExtractionLog, AddExtractionLog } from './extraction-log.dto';
import { ExtractionLogsService } from './extraction-logs.service';

@Controller('extraction-logs')
export class ExtractionLogsController {
    constructor(
        private extractionLogService: ExtractionLogsService,
    ) { }

    @Get()
    public getExtractionLogs(
    ): Promise<ExtractionLog[]> {
        return this.extractionLogService.getExtractionLogs();
    }

    @Get(':id')
    public getExtractionLogById(
        @Param() id: string,
    ): Promise<ExtractionLog> {
        return this.extractionLogService.getExtractionLogById(id);
    }

    @Post('add-extraction-log')
    public addExtractionLog(
        @Body() body: AddExtractionLog
    ): Promise<string> {
        const extractionLog = body;
        return this.extractionLogService.addNewExtractionLog(extractionLog);
    }

    @Delete('delete/:id')
    public deleteExtractionLog(
        @Param() id: string,
    ): Promise<void> {
        this.extractionLogService.deleteExtractionLog(id);
        return;
    }
}
