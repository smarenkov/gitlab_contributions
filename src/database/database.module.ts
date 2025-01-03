import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { databaseConfig } from './database.config';

@Module({
    imports: [TypeOrmModule.forRoot(databaseConfig)],
})
export class DatabaseModule {}
