import { Module } from '@nestjs/common';
import { ContributionController } from './controller/contribution.controller';
import { ContributionService } from './service/contribution.service';
import { IntegrationModule } from 'src/integration/integration.module';

@Module({
  imports: [
    IntegrationModule,
  ],
  controllers: [
    ContributionController,
  ],
  exports: [
    ContributionService
  ],
  providers: [
    ContributionService
  ]
})
export class ContributionModule { }