import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { ExtractionLog } from './extraction-log.dto';

@Injectable()
export class ExtractionLogsService {
    constructor(
        @InjectRepository(ExtractionLog)
        private extractionLogRepository: Repository<ExtractionLog>,
    ) { }

    public async getExtractionLogs(): Promise<ExtractionLog[]> {
        return await this.extractionLogRepository.find({
            order: {
                extractionDate: "DESC"
            }
        });
    }

    public async getExtractionLogById(id: string): Promise<ExtractionLog> {
        return await this.extractionLogRepository.findOne(id);
    }

    public async addNewExtractionLog(extractionLog: ExtractionLog): Promise<any> {
        if (!extractionLog.extractionTime || !extractionLog.weightIn || !extractionLog.weightOut) {
            throw new Error('No extraction data submitted');
        }
        extractionLog.extractionDate = new Date();
        const { identifiers } = await this.extractionLogRepository.insert(extractionLog);
        return identifiers[0];
    }

    public async deleteExtractionLog(id: string): Promise<void> {
        await this.extractionLogRepository.delete(id);
        return;
    }


}
