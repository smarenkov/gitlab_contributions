import { Expose, plainToInstance, Transform } from 'class-transformer';

export class GitHubCommitCommitterDto {

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

    static fromJson(json: any): GitHubCommitCommitterDto {
        return plainToInstance(GitHubCommitCommitterDto, json, { excludeExtraneousValues: true });
    }
}