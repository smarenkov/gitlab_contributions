import { Expose, plainToInstance, Type } from 'class-transformer';
import { GitHubCommitAuthorDto } from './commit.author.github.dto';
import { GitHubCommitCommitterDto } from './commit.committer.github.dto';

export class GitHubCommitDataDto {
    @Type(() => GitHubCommitAuthorDto)
    @Expose({ name: 'author' })
    author: GitHubCommitAuthorDto;

    @Type(() => GitHubCommitCommitterDto)
    @Expose({ name: 'committer' })
    committer: GitHubCommitCommitterDto;

    @Expose({ name: 'message' })
    message: string;

    @Expose({ name: 'tree.sha' })
    treeSha: string;

    @Expose({ name: 'tree.url' })
    treeUrl: string;

    @Expose({ name: 'verification.verified' })
    verified: boolean;

    @Expose({ name: 'verification.reason' })
    verificationReason: string;

    static fromJson(json: any): GitHubCommitDataDto {
        return plainToInstance(GitHubCommitDataDto, json, { excludeExtraneousValues: true });
    }
}