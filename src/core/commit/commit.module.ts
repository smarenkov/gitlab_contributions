import { Module } from '@nestjs/common';
import { CommitService } from './service/commit.service';
import { CommitRepository } from './repository/commit.repository';

@Module({
    exports: [CommitService],
    providers: [CommitService, CommitRepository],
})
export class CommitModule {}
