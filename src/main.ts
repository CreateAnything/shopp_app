import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidateExceptionFilter } from './filters/validate-exception.filter'
import { ValidatePipe } from './guard/validate.pipe'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'
async function bootstrap() {
	const fileRoot = process.env.UPLOAD_ROOT
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.useStaticAssets(fileRoot, {
		prefix: `/${fileRoot}`
	}) //设置静态资源
	app.setGlobalPrefix('api') //全局路由前缀
	app.enableCors() //开启跨域可访问
	const options = new DocumentBuilder()
		.setTitle('shopp_api')
		.setDescription('一个线上商城的app')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'Bearer' }, 'jwt') //加入authToken验证
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('Api', app, document)
	app.useGlobalInterceptors(new TransformInterceptor()) //使用全局拦截器统一返回请求结果
	app.useGlobalFilters(new ValidateExceptionFilter()) //全局错误过滤器
	app.useGlobalPipes(
		new ValidatePipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true
		})
	) //使用全局管道统一格式化参数错误信息
	await app.listen(process.env.APP_PORT)
	console.log(`接口文档运行在http://localhost:${process.env.APP_PORT}/Api`)
}
bootstrap()
