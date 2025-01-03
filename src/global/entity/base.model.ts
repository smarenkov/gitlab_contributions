import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    _createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    _updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    _deletedAt?: Date;

    @VersionColumn()
    _version: number;

    _type: string = this.constructor.name;
}
