import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dataBaseConfig from 'config/dataBase.config';

@Controller()
export class AppController {
  constructor(@Inject(dataBaseConfig.KEY) private readonly dataBase:ConfigType<typeof dataBaseConfig>) {}

  @Get()
  getHello(): any {
    return this.dataBase 
  }
}
