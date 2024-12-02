import { Injectable, Logger } from "@nestjs/common";
import { GitlabApi } from "../api/gitlab.api";
import { GitLabCommitDto } from "../dto/commit.gitlab.dto";
import { GitLabProjectDto } from "../dto/project.gitlab.dto";

@Injectable()
export class GitlabService {
  private readonly logger = new Logger(GitlabService.name);

  constructor (private readonly api: GitlabApi) { }

  async getCommits(projectId: number, author: string): Promise<GitLabCommitDto[]> {
    return this.api.fetchCommits(projectId, author);
  }

  async getContributedProjects(username: string): Promise<GitLabProjectDto[]> {
    return this.api.fetchContributedProjects(username);
  }
}