import { Expose, plainToInstance } from 'class-transformer';

export class GitLabProjectNamespaceDto {
    @Expose({ name: 'id' })
    id: number;

    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'path' })
    path: string;

    @Expose({ name: 'kind' })
    kind: string;

    @Expose({ name: 'full_path' })
    fullPath: string;

    @Expose({ name: 'parent_id' })
    parentId: number | null;

    @Expose({ name: 'avatar_url' })
    avatarUrl: string | null;

    @Expose({ name: 'web_url' })
    webUrl: string;

    static fromJson(json: any): GitLabProjectNamespaceDto {
        return plainToInstance(GitLabProjectNamespaceDto, json);
    }
}
