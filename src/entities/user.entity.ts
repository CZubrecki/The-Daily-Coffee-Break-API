import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bycrpt from 'bcrypt';

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bycrpt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bycrpt.compare(attempt, this.password);
    }

    toJSON() {
        return classToPlain(this);
    }
}