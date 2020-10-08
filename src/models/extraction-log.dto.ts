import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

export class ExtractionLog {
    @IsString()
    weightIn: number;

    @IsString()
    weightOut: number;

    @IsString()
    extractionTime: number;
}