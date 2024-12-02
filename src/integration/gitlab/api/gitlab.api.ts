import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { GitLabCommitDto } from "../dto/commit.gitlab.dto";
import { catchError, firstValueFrom } from "rxjs";
import { GitLabProjectDto } from "../dto/project.gitlab.dto";

@Injectable()
export class GitlabApi {
  private readonly logger = new Logger(GitlabApi.name);

  private readonly BASE_URL = 'https://gitlab.com/api/v4';

  constructor (private readonly http: HttpService) { }

  async fetchCommits(projectId: number, author: string): Promise<GitLabCommitDto[]> {
    try {
      const headers = {
        'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN
      };

      const today = new Date();
      const since = new Date(2011,1,1).toISOString(); // GitLab was created in 2011
      const until = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

      const query = `?author=${author}&since=${since}&until=${until}&per_page=10000`;

      const { data } = await firstValueFrom(
        this.http.get<any[]>(`${this.BASE_URL}/projects/${projectId}/repository/commits${query}`, { headers: headers }).pipe(
          catchError((error) => {
            this.logger.error(`Error fetching commits for project ${projectId}: ${error}`);
            throw error;
          }
          )
        )
      );

      return data.map((json) => GitLabCommitDto.fromJson(json));
    } catch (error) {
      console.error(`Error fetching commits for project ${projectId}: ${error}`);
      throw error;
    }
  }

  async fetchContributedProjects(username: string): Promise<GitLabProjectDto[]> {
    try {
      const headers = {
        'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN
      };

      const { data } = await firstValueFrom(
        this.http.get<any[]>(`${this.BASE_URL}/users/${username}/contributed_projects`, { headers: headers }).pipe(
          catchError((error) => {
            this.logger.error(`Error fetching contributed projects for user ${username}: ${error}`);
            throw error;
          }
          )
        )
      );

      return data.map((json) => GitLabProjectDto.fromJson(json));
    } catch (error) {
      console.error(`Error fetching contributed projects for user ${username}: ${error}`);
      throw error;
    }
  }
}