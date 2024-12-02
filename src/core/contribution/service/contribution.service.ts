import { Injectable, Logger } from "@nestjs/common";
import { GitlabService } from "src/integration/gitlab/service/gitlab.service";
import { CommitDto } from "../dto/commit.contribution.dto";

@Injectable()
export class ContributionService {
  private readonly logger = new Logger(ContributionService.name);

  private readonly COMMITS_HISTORY_REPO = '/Users/simon/Work/Personal/gitlab_commits';

  constructor (private readonly gitlabService: GitlabService) { }

  async getCommits(username: string, author: string): Promise<CommitDto[]> {
    const projects = await this.gitlabService.getContributedProjects(username);
    this.logger.log(`Fetched ${projects.length} projects for username ${username}`);

    const commits = [];
    for (const project of projects) {
      const projectCommits = await this.gitlabService.getCommits(project.id, author);
      this.logger.log(`Fetched ${projectCommits.length} commits for project ${project.name}`);

      if (project.visibility === 'private') {
        for (const commit of projectCommits) {
          commit.title = 'Contribution in private GitLab repository';
          commit.message = '';
        }
      }
      commits.push(...projectCommits);
    }
    this.logger.log(`Fetched ${commits.length} commits for all projects.`);

    return commits.map((commit) => CommitDto.fromGitlabCommit(commit))
  }

}
