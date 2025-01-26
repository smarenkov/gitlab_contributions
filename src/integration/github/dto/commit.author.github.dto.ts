import { Expose, plainToInstance, Transform } from 'class-transformer';

export class GitHubCommitAuthorDto {
    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'email' })
    email: string;

    @Expose({ name: 'date' })
    @Transform(({ value }) => new Date(value))
    date: Date;

    @Expose({ name: 'login' })
    login: string;

    @Expose({ name: 'avatar_url' })
    avatarUrl: string;

    static fromJson(json: any): GitHubCommitAuthorDto {
        return plainToInstance(GitHubCommitAuthorDto, json, { excludeExtraneousValues: true });
    }
}