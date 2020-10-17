import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ExtractionLog {
    @IsString()
    weightIn: number;

    @IsString()
    weightOut: number;

    @IsString()
    extractionTime: number;

    @IsOptional()
    @IsString()
    grindSize?: string;

    @IsOptional()
    rating?: number;
}

export class UpdateExtractionLogDTO {
    @IsOptional()
    rating?: number;

    @IsOptional()
    notes?: string;
}

export class ExtractionLogFilter {
    @IsOptional()
    rating?: any;

    @IsOptional()
    weightInFilter?: any;

    @IsOptional()
    weightOutFilter?: any;

    @IsOptional()
    extractionFilter?: any;
}