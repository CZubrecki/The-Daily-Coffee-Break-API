import { IsDate, IsNumber } from "class-validator";

export class ExtractionLog {
    @IsNumber()
    weightIn: number;

    @IsNumber()
    weightOut: number;

    @IsNumber()
    extractionTime: number;

    @IsDate()
    extractionDate: Date;
}