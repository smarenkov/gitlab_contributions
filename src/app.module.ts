import { Module } from '@nestjs/common';
import { IntegrationModule } from './integration/integration.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    IntegrationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
