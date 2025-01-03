import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Commit } from '../entity/commit.entity';

@Injectable()
export class CommitRepository extends Repository<Commit> {
    constructor(private dataSource: DataSource) {
        super(Commit, dataSource.createEntityManager());
    }
}
