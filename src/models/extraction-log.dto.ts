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