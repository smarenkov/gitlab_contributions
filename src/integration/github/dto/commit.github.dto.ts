import { Expose, plainToInstance, Type } from 'class-transformer';
import { GitHubCommitDataDto } from './commit.data.github.dto';

export class GitHubCommitDto {
    @Expose({ name: 'sha' })
    sha: string;

    @Expose({ name: 'node_id' })
    nodeId: string;

    @Expose({ name: 'url' })
    apiUrl: string;

    @Expose({ name: 'html_url' })
    htmlUrl: string;

    @Expose({ name: 'comments_url' })
    commentsUrl: string;

    @Type(() => GitHubCommitDataDto)
    @Expose({ name: 'commit' })
    data: GitHubCommitDataDto;

    @Expose({ name: 'parents' })
    parents: {
        sha: string;
        url: string;
        htmlUrl: string;
    }[];

    static fromJson(json: any): GitHubCommitDto {
        return plainToInstance(GitHubCommitDto, json, { excludeExtraneousValues: true });
    }
}