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
        return this.service.getCommits(data);
    }

    @Get('/gitlab/commits/project/:projectId')
    async getGitlabCommitsByProjectId(@Body() data: GetCommitsRequestDto, @Param('projectId') projectId: number): Promise<CommitDto[]> {
        this.logger.log(`Getting Gitlab commits for author ${data.author}`);
        return this.service.getCommitsByProjectId(data, projectId);
    }

    @Get('/update')
    async updateGitHubContributions(@Body() data: GetCommitsRequestDto): Promise<void> {
        this.logger.log(`Updating GitHub Contributions`);
        return this.service.updateGitHubContributions(data);
    }
}
