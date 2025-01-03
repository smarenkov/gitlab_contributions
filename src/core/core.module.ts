import { Module } from '@nestjs/common';
import { ContributionModule } from './contribution/contribution.module';
import { CommitModule } from './commit/commit.module';

@Module({
    imports: [ContributionModule, CommitModule],
    exports: [ContributionModule, CommitModule],
    providers: [ContributionModule, CommitModule],
})
export class CoreModule {}
