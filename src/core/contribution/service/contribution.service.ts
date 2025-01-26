import { Injectable, Logger } from '@nestjs/common';
import { GitlabService } from 'src/integration/gitlab/service/gitlab.service';
import { CommitDto } from '../../commit/dto/commit.dto';
import { GetCommitsRequestDto } from '../dto/get-commits.request.dto';
import { GitExecutor } from 'src/core/contribution/service/git.executor';
import { CommitService } from 'src/core/commit/service/commit.service';
import { GithubService } from 'src/integration/github/service/github.service';

@Injectable()
export class ContributionService {
    private readonly logger = new Logger(ContributionService.name);

    constructor (
        private readonly gitlabService: GitlabService,
        private readonly githubService: GithubService,
        private readonly commitService: CommitService,
        private readonly gitExecutor: GitExecutor,
    ) { }

    async getGitlabCommits(data: GetCommitsRequestDto): Promise<CommitDto[]> {
        const projects = await this.gitlabService.getContributedProjects(data.username);

        const commits = [] as CommitDto[];
        for (const project of projects) {
            const projectCommits = await this.getGitlabCommitsByProjectId(data, project.id);
            commits.push(...projectCommits);
        }
        this.logger.log(`Fetched ${commits.length} commits for all projects.`);

        for (const commit of commits) {
            await this.commitService.save(commit);
        }

        return commits;
    }

    async getGitlabCommitsByProjectId(data: GetCommitsRequestDto, projectId: number): Promise<CommitDto[]> {
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

    async getGithubCommits(data: GetCommitsRequestDto): Promise<CommitDto[]> {
        // const projects = await this.gitlabService.getContributedProjects(data.username);
        const projects = [{ id: 1, name: 'gitlab_commits', visibility: 'private' }];

        const commits = [] as CommitDto[];
        for (const project of projects) {
            const projectCommits = await this.getGithubCommitsByProjectName(data, project.name);
            commits.push(...projectCommits);
        }
        this.logger.log(`Fetched ${commits.length} commits for all projects.`);

        for (const commit of commits) {
            await this.commitService.save(commit);
        }

        return commits;
    }

    async getGithubCommitsByProjectName(data: GetCommitsRequestDto, projectName: string): Promise<CommitDto[]> {
        // const project = await this.gitlabService.getProject(projectId);
        const project = { id: 1, name: projectName, visibility: 'private' };

        const commits = await this.githubService.getCommits(data.username, project.name, data.author);
        this.logger.log(`Fetched ${commits.length} commits for project ${project.name}`);

        if (project.visibility === 'private') {
            for (const commit of commits) {
                // commit.title = '';
                commit.data.message = 'Contribution in private GitLab repository';
            }
        }
        return commits.map((commit) => CommitDto.fromGithubCommit(commit));
    }



    async updateGitHubContributions(data: GetCommitsRequestDto): Promise<void> {
        const commits = await this.getGitlabCommits(data);
        commits.sort((a, b) => new Date(a.committedAt).getTime() - new Date(b.committedAt).getTime());

        for (const commit of commits) {
            await this.gitExecutor.run(commit);
        }
    }
}
