import { Expose } from 'class-transformer';

export class GitLabPermissionsDto {
    @Expose({ name: 'project_access' })
    projectAccess: any | null;

    @Expose({ name: 'group_access' })
    groupAccess: {
        access_level: number;
        notification_level: number;
    };
}
