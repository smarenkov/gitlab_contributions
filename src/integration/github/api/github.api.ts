import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { GitHubCommitDto } from '../dto/commit.github.dto';

@Injectable()
export class GithubApi {
  private readonly logger = new Logger(GithubApi.name);

  private readonly BASE_URL = 'https://api.github.com';

  constructor (private readonly http: HttpService) { }

  async fetchCommits(repositoryOwner: string, repositoryName: string, author: string, page: number = 1): Promise<GitHubCommitDto[]> {
    try {
      const headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      };

      const perPage = 100;
      const query = `?author=${author}&page=${page}&per_page=${perPage}`;

      const { data } = await firstValueFrom(
        this.http.get<any[]>(`${this.BASE_URL}/repos/${repositoryOwner}/${repositoryName}/commits${query}`, { headers: headers }).pipe(
          catchError((error) => {
            this.logger.error(`Error fetching commits for repository ${repositoryName}: ${error}`);
            throw error;
          }),
        ),
      );

      return data.map((json) => GitHubCommitDto.fromJson(json));
    } catch (error) {
      console.error(`Error fetching commits for repository ${repositoryName}: ${error}`);
      throw error;
    }
  }
}
