import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ExtractionLogEntity } from 'src/entities/extraction-log.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ExtractionLog, ExtractionLogFilter, UpdateExtractionLogDTO } from 'src/models/extraction-log.dto';
import { Repository } from 'typeorm/repository/Repository';
import * as _ from 'lodash';
import { Between } from 'typeorm';
import * as Tesseract from 'tesseract.js'

@Injectable()
export class ExtractionLogsService {
    constructor(
        @InjectRepository(ExtractionLogEntity)
        private extractionLogRepository: Repository<ExtractionLogEntity>,
    ) { }

    public async getExtractionLogs(currentUser: UserEntity, filter?: ExtractionLogFilter): Promise<ExtractionLogEntity[]> {
        const filters = {
            ownerId: currentUser.id
        };

        if (filter.rating !== 'undefined') {
            filters['rating'] = filter.rating;
        }

        if (filter.extractionFilter !== 'undefined') {
            const extractionFilter = filter.extractionFilter.split(',').map((value: any) => +value);
            filters['extractionTime'] = Between(extractionFilter[0], extractionFilter[1]);
        }

        if (filter.weightInFilter !== 'undefined') {
            const weightInFilter = filter.weightInFilter.split(',').map((value: any) => +value);
            filters['weightIn'] = Between(weightInFilter[0], weightInFilter[1]);
        }

        if (filter.weightOutFilter !== 'undefined') {
            const weightOutFilter = filter.weightOutFilter.split(',').map((value: any) => +value);
            filters['weightOut'] = Between(weightOutFilter[0], weightOutFilter[1]);
        }

        return await this.extractionLogRepository.find({
            where: filters,
            order: {
                extractionDate: 'DESC',
            }
        });
    }

    public async getExtractionLogById(id: string): Promise<ExtractionLogEntity> {
        return await this.extractionLogRepository.findOne(id);
    }

    public async addNewExtractionLog(extractionLog: ExtractionLog, currentUser: UserEntity): Promise<any> {
        if (!extractionLog.extractionTime || !extractionLog.weightIn || !extractionLog.weightOut) {
            throw new Error('No extraction data submitted');
        }
        const { identifiers } = await this.extractionLogRepository.insert({ ...extractionLog, extractionDate: new Date(), ownerId: currentUser.id });
        return identifiers[0];
    }

    public async updateExtractionLog(id: string, { rating, notes }: UpdateExtractionLogDTO): Promise<any> {
        let extractionLog = await this.extractionLogRepository.findOne(id);

        extractionLog.rating = rating;
        extractionLog.notes = notes;
        const updatedExtractionLog = await this.extractionLogRepository.save(extractionLog);

        return updatedExtractionLog.id;
    }

    public async deleteExtractionLog(id: string): Promise<void> {
        await this.extractionLogRepository.delete(id);
        return;
    }

    public async processImage(body: any) {
        const worker = Tesseract.createWorker({
            logger: m => console.log(m)
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(body.uri);
        console.log(text);
        await worker.terminate();
    }


}
