import { Expose, plainToInstance, Type } from 'class-transformer';
import { GitLabPermissionsDto } from './permissions.gitlab.dto';
import { GitLabContainerExpirationPolicyDto } from './container-expiration-policy.gitlab.dto';
import { GitLabNamespaceDto } from './namespace.gitlab.dto';

export class GitLabProjectDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string | null;

    @Expose({ name: 'name_with_namespace' })
    nameWithNamespace: string;

    @Expose()
    path: string;

    @Expose({ name: 'path_with_namespace' })
    pathWithNamespace: string;

    @Expose({ name: 'created_at' })
    createdAt: string;

    @Expose({ name: 'default_branch' })
    defaultBranch: string;

    @Expose({ name: 'tag_list' })
    tagList: string[];

    @Expose()
    topics: string[];

    @Expose({ name: 'ssh_url_to_repo' })
    sshUrlToRepo: string;

    @Expose({ name: 'http_url_to_repo' })
    httpUrlToRepo: string;

    @Expose({ name: 'web_url' })
    webUrl: string;

    @Expose({ name: 'readme_url' })
    readmeUrl: string;

    @Expose({ name: 'forks_count' })
    forksCount: number;

    @Expose({ name: 'avatar_url' })
    avatarUrl: string | null;

    @Expose({ name: 'star_count' })
    starCount: number;

    @Expose({ name: 'last_activity_at' })
    lastActivityAt: string;

    @Type(() => GitLabNamespaceDto)
    @Expose()
    namespace: GitLabNamespaceDto;

    @Expose({ name: 'container_registry_image_prefix' })
    containerRegistryImagePrefix: string;

    @Expose({ name: '_links' })
    links: Record<string, string>;

    @Expose({ name: 'packages_enabled' })
    packagesEnabled: boolean;

    @Expose({ name: 'empty_repo' })
    emptyRepo: boolean;

    @Expose()
    archived: boolean;

    @Expose()
    visibility: string;

    @Expose({ name: 'resolve_outdated_diff_discussions' })
    resolveOutdatedDiffDiscussions: boolean;

    @Type(() => GitLabContainerExpirationPolicyDto)
    @Expose({ name: 'container_expiration_policy' })
    containerExpirationPolicy: GitLabContainerExpirationPolicyDto;

    @Expose({ name: 'repository_object_format' })
    repositoryObjectFormat: string;

    @Expose({ name: 'issues_enabled' })
    issuesEnabled: boolean;

    @Expose({ name: 'merge_requests_enabled' })
    mergeRequestsEnabled: boolean;

    @Expose({ name: 'wiki_enabled' })
    wikiEnabled: boolean;

    @Expose({ name: 'jobs_enabled' })
    jobsEnabled: boolean;

    @Expose({ name: 'snippets_enabled' })
    snippetsEnabled: boolean;

    @Expose({ name: 'container_registry_enabled' })
    containerRegistryEnabled: boolean;

    @Expose({ name: 'service_desk_enabled' })
    serviceDeskEnabled: boolean;

    @Expose({ name: 'service_desk_address' })
    serviceDeskAddress: string;

    @Expose({ name: 'can_create_merge_request_in' })
    canCreateMergeRequestIn: boolean;

    @Expose({ name: 'issues_access_level' })
    issuesAccessLevel: string;

    @Expose({ name: 'repository_access_level' })
    repositoryAccessLevel: string;

    @Expose({ name: 'merge_requests_access_level' })
    mergeRequestsAccessLevel: string;

    @Expose({ name: 'forking_access_level' })
    forkingAccessLevel: string;

    @Expose({ name: 'wiki_access_level' })
    wikiAccessLevel: string;

    @Expose({ name: 'builds_access_level' })
    buildsAccessLevel: string;

    @Expose({ name: 'snippets_access_level' })
    snippetsAccessLevel: string;

    @Expose({ name: 'pages_access_level' })
    pagesAccessLevel: string;

    @Expose({ name: 'analytics_access_level' })
    analyticsAccessLevel: string;

    @Expose({ name: 'container_registry_access_level' })
    containerRegistryAccessLevel: string;

    @Expose({ name: 'security_and_compliance_access_level' })
    securityAndComplianceAccessLevel: string;

    @Expose({ name: 'releases_access_level' })
    releasesAccessLevel: string;

    @Expose({ name: 'environments_access_level' })
    environmentsAccessLevel: string;

    @Expose({ name: 'feature_flags_access_level' })
    featureFlagsAccessLevel: string;

    @Expose({ name: 'monitor_access_level' })
    monitorAccessLevel: string;

    @Type(() => GitLabPermissionsDto)
    @Expose()
    permissions: GitLabPermissionsDto;

    static fromJson(json: any): GitLabProjectDto {
        return plainToInstance(GitLabProjectDto, json);
    }
}
