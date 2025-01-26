import { Module } from '@nestjs/common';
import { GitlabModule } from './gitlab/gitlab.module';
import { GithubModule } from './github/github.module';

@Module({
    imports: [GitlabModule, GithubModule],
    exports: [GitlabModule, GithubModule],
    providers: [GitlabModule, GithubModule],
})
export class IntegrationModule {}
