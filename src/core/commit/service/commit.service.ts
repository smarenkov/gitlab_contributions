import { Injectable, Logger } from '@nestjs/common';
import { CommitRepository } from '../repository/commit.repository';
import { Commit } from '../entity/commit.entity';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { CommitSource } from 'src/core/commit/inner/commit-source.enum';

@Injectable()
export class CommitService {
    private readonly logger = new Logger(CommitService.name);

    constructor(private readonly repository: CommitRepository) {}

    getByHashAndSource(hash: string, source: CommitSource): Promise<Commit> {
        return this.repository.findOne({ where: { hash, source } });
    }

    getAll(): Promise<Commit[]> {
        return this.repository.find();
    }

    async save(partial: Partial<Commit>): Promise<Commit> {
        const commit = await this.getByHashAndSource(partial.hash, partial.source);
        if (commit) {
            return commit;
        }

        return this.repository.save(partial);
    }

    update(query: FindOptionsWhere<Commit>, partial: Partial<Commit>): Promise<UpdateResult> {
        return this.repository.update(query, partial);
    }
}
