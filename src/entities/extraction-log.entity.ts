import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('extraction-logs')
export class ExtractionLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column('datetime')
    extractionDate: Date;

    @Column()
    extractionTime: number;

    @Column()
    weightIn: number;

    @Column()
    weightOut: number;
}