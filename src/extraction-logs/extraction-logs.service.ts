import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { ExtractionLogEntity } from 'src/entities/extraction-log.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ExtractionLog, UpdateExtractionLogDTO } from 'src/models/extraction-log.dto';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ExtractionLogsService {
    constructor(
        @InjectRepository(ExtractionLogEntity)
        private extractionLogRepository: Repository<ExtractionLogEntity>,
    ) { }

    public async getExtractionLogs(currentUser: UserEntity): Promise<ExtractionLogEntity[]> {
        return await this.extractionLogRepository.find({
            where: { ownerId: currentUser.id },
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

    public async updateExtractionLog({ id, rating, notes }: UpdateExtractionLogDTO): Promise<any> {
        let extractionLog = await this.extractionLogRepository.findOne(id);

        if (rating) {
            extractionLog.rating = rating;
        }

        if (notes) {
            extractionLog.notes = notes;
        }

        const updatedExtractionLog = await this.extractionLogRepository.save(extractionLog);
        return updatedExtractionLog.id;
    }

    public async deleteExtractionLog(id: string): Promise<void> {
        await this.extractionLogRepository.delete(id);
        return;
    }


}
