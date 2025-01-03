import { Column, Entity } from 'typeorm';
import { CommitSource } from '../inner/commit-source.enum';
import { BaseModel } from 'src/global/entity/base.model';

@Entity({ name: 'commits' })
export class Commit extends BaseModel {
    @Column({ type: 'varchar' })
    hash: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    message: string;

    @Column({ name: 'committed_at', type: 'timestamptz' })
    committedAt: Date;

    @Column({ type: 'varchar', enum: CommitSource })
    source: CommitSource;

    constructor(partial: Partial<Commit>) {
        super();
        Object.assign(this, partial);
    }
}
