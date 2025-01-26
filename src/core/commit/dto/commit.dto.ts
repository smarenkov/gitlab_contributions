import { ApiProperty } from '@nestjs/swagger';
import { GitLabCommitDto } from 'src/integration/gitlab/dto/commit.gitlab.dto';
import { CommitSource } from '../inner/commit-source.enum';
import { GitHubCommitDto } from 'src/integration/github/dto/commit.github.dto';

export class CommitDto {
    @ApiProperty({ example: '4e1578061b4f2e03c4c596e59a5ff1dcc4073b8e' })
    hash: string;

    @ApiProperty({ example: 'Initial commit' })
    title: string;

    @ApiProperty({ example: 'Commit message' })
    message: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000+00:00' })
    committedAt: Date;

    @ApiProperty({ example: 'GitLab', enum: CommitSource })
    source: CommitSource;

    static fromGitlabCommit(commit: GitLabCommitDto): CommitDto {
        return {
            hash: commit.id,
            title: commit.title,
            message: commit.message,
            committedAt: commit.committedDate,
            source: CommitSource.GITLAB,
        };
    }

    static fromGithubCommit(commit: GitHubCommitDto): CommitDto {
        return {
            hash: commit.sha,
            title: '',
            message: commit.data.message,
            committedAt: commit.data.committer.date,
            source: CommitSource.GITHUB,
        };
    }
}
