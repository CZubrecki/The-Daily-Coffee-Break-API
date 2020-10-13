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

    @Column({ nullable: true })
    grindSize: string;

    @Column({ nullable: true })
    rating: number;

    @Column({ nullable: true })
    shotTemperature: number;

    @Column({ nullable: true })
    beans: string;

    @Column({ nullable: true })
    notes: string;
}