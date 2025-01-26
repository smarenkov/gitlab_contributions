import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './service/github.service';
import { GithubApi } from './api/github.api';

@Module({
    imports: [HttpModule],
    exports: [GithubService, GithubApi],
    providers: [GithubService, GithubApi],
})
export class GithubModule {}
