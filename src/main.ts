import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
        .setTitle("shopp_api")
        .setDescription("一个线上商城的app")
        .setVersion('1.0')
        .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('Api',app,document)
  await app.listen(process.env.APP_PORT);
  console.log(`接口文档运行在http://localhost:${process.env.APP_PORT}/Api`)
}
bootstrap();
