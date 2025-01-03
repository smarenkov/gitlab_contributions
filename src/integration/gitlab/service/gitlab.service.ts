import { Injectable, Logger } from '@nestjs/common';
import { GitlabApi } from '../api/gitlab.api';
import { GitLabCommitDto } from '../dto/commit.gitlab.dto';
import { GitLabProjectDto } from '../dto/project.gitlab.dto';

@Injectable()
export class GitlabService {
    private readonly logger = new Logger(GitlabService.name);

    constructor(private readonly api: GitlabApi) {}

    async getCommits(projectId: number, author: string): Promise<GitLabCommitDto[]> {
        const result: GitLabCommitDto[] = [];
        let hasMoreCommits = true;
        let page = 1;

        do {
            const commits = await this.api.fetchCommits(projectId, author, page);
            result.push(...commits);
            page++;

            hasMoreCommits = commits.length >= 100;
        } while (hasMoreCommits);

        return result;
    }

    async getContributedProjects(username: string): Promise<GitLabProjectDto[]> {
        return this.api.fetchContributedProjects(username);
    }

    async getProject(projectId: number): Promise<GitLabProjectDto> {
        return this.api.fetchProject(projectId);
    }
}
