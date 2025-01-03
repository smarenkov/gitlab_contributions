import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitlabService } from './service/gitlab.service';
import { GitlabApi } from './api/gitlab.api';

@Module({
    imports: [HttpModule],
    exports: [GitlabService, GitlabApi],
    providers: [GitlabService, GitlabApi],
})
export class GitlabModule {}
