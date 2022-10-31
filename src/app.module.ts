import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import appConfig from '@/config/index'
import { GoodsModule } from './controller/goods/goods.module'
import { AuthModule } from './controller/auth/auth.module'
import { CartModule } from './controller/cart/cart.module'
import { OrderModule } from './controller/order/order.module'
import { OrderitemModule } from './controller/orderitem/orderitem.module'
import { PayinfoModule } from './controller/payinfo/payinfo.module'
import { UserModule } from './controller/user/user.module'
import { UploadModule } from './controller/upload/upload.module'
import { CategoryModule } from './controller/category/category.module'

@Module({
	imports: [
		//设置为全局配置
		ConfigModule.forRoot({
			isGlobal: true,
			load: [...appConfig]
		}),
		TypeOrmModule.forRootAsync({
			//数据库配置
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => config.get('dataBase'),
			inject: [ConfigService]
		}),
		AuthModule,
		GoodsModule,
		CartModule,
		OrderModule,
		OrderitemModule,
		PayinfoModule,
		UserModule,
		UploadModule,
		CategoryModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
