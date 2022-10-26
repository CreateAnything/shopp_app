import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './controller/user/user.module'
import { GoodsModule } from './controller/goods/goods.module'
import { CategoryModule } from './controller/category/category.module'
import { CartModule } from './controller/cart/cart.module'
import { OrderModule } from './controller/order/order.module'
import { AddressController } from './controller/address/address.controller'
import { AddressModule } from './controller/address/address.module'
import { PayinfoController } from './controller/payinfo/payinfo.controller'
import { PayinfoModule } from './controller/payinfo/payinfo.module'
import { OrderitemController } from './controller/orderitem/orderitem.controller'
import { OrderitemModule } from './controller/orderitem/orderitem.module'
import { AuthController } from './controller/auth/auth.controller'
import { AuthModule } from './controller/auth/auth.module'
import { CartController } from './controller/cart/cart.controller'
import { UserController } from './controller/user/user.controller'
import { GoodsController } from './controller/goods/goods.controller'
import { OrderController } from './controller/order/order.controller'
import { CategoryController } from './controller/category/category.controller'
import appConfig from 'config/index'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, //设置为全局配置
			load: [...appConfig],
		}),
		TypeOrmModule.forRootAsync({
			//数据库配置
			useFactory: (config: ConfigService) => config.get('dataBase'),
			inject: [ConfigService],
		}),
		UserModule,
		GoodsModule,
		CategoryModule,
		CartModule,
		OrderModule,
		AddressModule,
		PayinfoModule,
		OrderitemModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
