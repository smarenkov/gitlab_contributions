import { Body, Controller, Get, Logger } from "@nestjs/common";
import { ContributionService } from "../service/contribution.service";
import { CommitDto } from "../dto/commit.contribution.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('ContributionController')
@Controller('contributions')
export class ContributionController {
  private readonly logger = new Logger(ContributionController.name);

  constructor (private readonly service: ContributionService) { }

  @Get('/gitlab/commits')
  async getGitlabCommits(@Body() data: { username: string, author: string }): Promise<CommitDto[]> {
    this.logger.log(`Getting Gitlab commits for username ${data.username}, author ${data.author}`);
    return this.service.getCommits(data.username, data.author);
  }
}