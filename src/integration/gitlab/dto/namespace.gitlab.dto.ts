import { Expose } from "class-transformer";

export class GitLabNamespaceDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  path: string;

  @Expose()
  kind: string;

  @Expose({ name: 'full_path' })
  fullPath: string;

  @Expose({ name: 'parent_id' })
  parentId: number | null;

  @Expose({ name: 'avatar_url' })
  avatarUrl: string | null;

  @Expose({ name: 'web_url' })
  webUrl: string;
}