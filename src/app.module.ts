import { Module } from '@nestjs/common';
import { IntegrationModule } from './integration/integration.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        DatabaseModule,
        IntegrationModule,
        CoreModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
