import { PayInfo } from '@/entities/payinfo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayinfoService } from './payinfo.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([PayInfo])
  ],
  providers: [PayinfoService]
})
export class PayinfoModule {}
