import { Test, TestingModule } from '@nestjs/testing';
import { ExtractionLogsService } from './extraction-logs.service';

describe('ExtractionLogsService', () => {
  let service: ExtractionLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractionLogsService],
    }).compile();

    service = module.get<ExtractionLogsService>(ExtractionLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
