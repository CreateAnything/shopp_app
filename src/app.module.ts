import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from '../config/index'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './controller/user/user.module';
import { GoodsModule } from './controller/goods/goods.module';
import { CategoryModule } from './controller/category/category.module';
import { CartModule } from './controller/cart/cart.module';
import { OrderModule } from './controller/order/order.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,//设置为全局配置
      load:[...appConfig]
    }),
    TypeOrmModule.forRootAsync({//数据库配置
        useFactory: (config: ConfigService) => config.get('dataBase'),
        inject: [ConfigService],  
        extraProviders:[UserModule,GoodsModule,CategoryModule,CartModule,OrderModule]
      },
      ),
    CategoryModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
