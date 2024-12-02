import { Expose, plainToInstance } from "class-transformer";

export class GitLabCommitDto {
  @Expose({ name: 'id' })
  id: string;

  @Expose({ name: 'short_id' })
  shortId: string;

  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose({ name: 'parent_ids' })
  parentIds: string[];

  @Expose()
  title: string;

  @Expose()
  message: string;

  @Expose({ name: 'author_name' })
  authorName: string;

  @Expose({ name: 'author_email' })
  authorEmail: string;

  @Expose({ name: 'authored_date' })
  authoredDate: string;

  @Expose({ name: 'committer_name' })
  committerName: string;

  @Expose({ name: 'committer_email' })
  committerEmail: string;

  @Expose({ name: 'committed_date' })
  committedDate: string;

  @Expose()
  trailers: Record<string, any>;

  @Expose({ name: 'extended_trailers' })
  extendedTrailers: Record<string, any>;

  @Expose({ name: 'web_url' })
  webUrl: string;

  static fromJson(json: any): GitLabCommitDto {
    return plainToInstance(GitLabCommitDto, json);
  }
}