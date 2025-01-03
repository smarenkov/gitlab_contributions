import { Module } from '@nestjs/common';
import { ContributionController } from './controller/contribution.controller';
import { ContributionService } from './service/contribution.service';
import { IntegrationModule } from 'src/integration/integration.module';
import { GitExecutor } from './service/git.executor';
import { CommitModule } from '../commit/commit.module';

@Module({
    imports: [IntegrationModule, CommitModule],
    controllers: [ContributionController],
    exports: [ContributionService, GitExecutor],
    providers: [ContributionService, GitExecutor],
})
export class ContributionModule {}
