import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Contribution API')
        .setDescription('API to get contribution data from different sources')
        .setVersion('1.0.0')
        .addTag('Contribution')
        .build();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(process.env.PORT ?? 3010, async () => {
        console.log(`Server start on port = ${process.env.PORT}`);
        console.log(`Swagger start on port = ${process.env.PORT}/api/docs`);
    });
}

bootstrap();
