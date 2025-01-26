import { Body, Controller, Get, Logger, Param } from '@nestjs/common';
import { ContributionService } from '../service/contribution.service';
import { CommitDto } from '../../commit/dto/commit.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCommitsRequestDto } from '../dto/get-commits.request.dto';

@ApiTags('ContributionController')
@Controller('contributions')
export class ContributionController {
    private readonly logger = new Logger(ContributionController.name);

    constructor(private readonly service: ContributionService) {}

    @Get('/gitlab/commits')
    async getGitlabCommits(@Body() data: GetCommitsRequestDto): Promise<CommitDto[]> {
        this.logger.log(`Getting Gitlab commits for author ${data.author}`);
        return this.service.getGitlabCommits(data);
    }

    @Get('/gitlab/commits/project/:projectId')
    async getGitlabCommitsByProjectId(@Body() data: GetCommitsRequestDto, @Param('projectId') projectId: number): Promise<CommitDto[]> {
        this.logger.log(`Getting Gitlab commits for author ${data.author}`);
        return this.service.getGitlabCommitsByProjectId(data, projectId);
    }

    @Get('/github/commits')
    async getGithubCommits(@Body() data: GetCommitsRequestDto): Promise<CommitDto[]> {
        this.logger.log(`Getting Github commits for author ${data.author}`);
        return this.service.getGithubCommits(data);
    }

    // @Get('/github/commits/project/:projectName')
    // async getGithubCommitsByProjectId(@Body() data: GetCommitsRequestDto, @Param('projectName') projectName: string): Promise<CommitDto[]> {
    //     this.logger.log(`Getting Github commits for author ${data.author}`);
    //     return this.service.getGithubCommitsByProjectName(data, projectName);
    // }

    @Get('/update')
    async updateGitHubContributions(@Body() data: GetCommitsRequestDto): Promise<void> {
        this.logger.log(`Updating GitHub Contributions`);
        return this.service.updateGitHubContributions(data);
    }
}
