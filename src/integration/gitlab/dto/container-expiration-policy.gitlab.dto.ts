import { Expose } from "class-transformer";

export class GitLabContainerExpirationPolicyDto {
  @Expose()
  cadence: string;

  @Expose()
  enabled: boolean;

  @Expose({ name: 'keep_n' })
  keepN: number;

  @Expose({ name: 'older_than' })
  olderThan: string;

  @Expose({ name: 'name_regex' })
  nameRegex: string;

  @Expose({ name: 'name_regex_keep' })
  nameRegexKeep: string | null;

  @Expose({ name: 'next_run_at' })
  nextRunAt: string;
}