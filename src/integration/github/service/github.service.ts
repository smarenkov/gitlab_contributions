import { Injectable, Logger } from '@nestjs/common';
import { GithubApi } from '../api/github.api';
import { GitHubCommitDto } from '../dto/commit.github.dto';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  constructor (private readonly api: GithubApi) { }

  async getCommits(repositoryOwner: string, repositoryName: string, author: string): Promise<GitHubCommitDto[]> {
    const result: GitHubCommitDto[] = [];
    let hasMoreCommits = true;
    let page = 1;

    do {
      const commits = await this.api.fetchCommits(repositoryOwner, repositoryName, author, page);
      result.push(...commits);
      page++;

      hasMoreCommits = commits.length >= 100;
    } while (hasMoreCommits);

    return result;
  }
}
