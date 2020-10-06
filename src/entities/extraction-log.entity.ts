import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExtractionLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime')
    extractionDate: Date;

    @Column()
    extractionTime: number;

    @Column()
    weightIn: number;

    @Column()
    weightOut: number;
}