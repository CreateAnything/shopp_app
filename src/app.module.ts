import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from '../config/index'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './controller/user/user.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,//设置为全局配置
      load:[...appConfig]
    }),
    TypeOrmModule.forRootAsync({//数据库配置
        useFactory: (config: ConfigService) => config.get('dataBase'),
        inject: [ConfigService],  
        extraProviders:[UserModule]
      },
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
