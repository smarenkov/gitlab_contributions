import { Injectable, Logger } from '@nestjs/common';
import { GitlabService } from 'src/integration/gitlab/service/gitlab.service';
import { CommitDto } from '../../commit/dto/commit.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import { format } from 'date-fns';
import { GetCommitsRequestDto } from '../dto/get-commits.request.dto';
import { GitExecutor } from 'src/core/contribution/service/git.executor';
import { CommitService } from 'src/core/commit/service/commit.service';

const execAsync = promisify(exec);

@Injectable()
export class ContributionService {
    private readonly logger = new Logger(ContributionService.name);

    constructor(
        private readonly gitlabService: GitlabService,
        private readonly commitService: CommitService,
        private readonly gitExecutor: GitExecutor,
    ) {}

    async getCommits(data: GetCommitsRequestDto): Promise<CommitDto[]> {
        const projects = await this.gitlabService.getContributedProjects(data.username);

        const commits = [] as CommitDto[];
        for (const project of projects) {
            const projectCommits = await this.getCommitsByProjectId(data, project.id);
            commits.push(...projectCommits);
        }
        this.logger.log(`Fetched ${commits.length} commits for all projects.`);

        for (const commit of commits) {
            await this.commitService.save(commit);
        }

        return commits;
    }

    async getCommitsByProjectId(data: GetCommitsRequestDto, projectId: number): Promise<CommitDto[]> {
        const project = await this.gitlabService.getProject(projectId);

        const commits = await this.gitlabService.getCommits(project.id, data.author);
        this.logger.log(`Fetched ${commits.length} commits for project ${project.name}`);

        if (project.visibility === 'private') {
            for (const commit of commits) {
                commit.title = 'Contribution in private GitLab repository';
                commit.message = '';
            }
        }
        return commits.map((commit) => CommitDto.fromGitlabCommit(commit));
    }

    async updateGitHubContributions(data: GetCommitsRequestDto): Promise<void> {
        const commits = await this.getCommits(data);
        commits.sort((a, b) => new Date(a.committedAt).getTime() - new Date(b.committedAt).getTime());

        for (const commit of commits) {
            await this.gitExecutor.run(commit);
        }
    }
}
