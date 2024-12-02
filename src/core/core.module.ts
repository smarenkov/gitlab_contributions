import { Module } from '@nestjs/common';
import { ContributionModule } from './contribution/contribution.module';

@Module({
  imports: [
    ContributionModule,
  ],
  exports: [
    ContributionModule
  ],
  providers: [
    ContributionModule
  ]
})
export class CoreModule { }
