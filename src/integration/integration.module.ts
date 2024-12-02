import { Module } from '@nestjs/common';
import { GitlabModule } from './gitlab/gitlab.module';

@Module({
  imports: [
    GitlabModule
  ],
  exports: [
    GitlabModule
  ],
  providers: [
    GitlabModule
  ],
})
export class IntegrationModule { }