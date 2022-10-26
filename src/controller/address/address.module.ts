import { Address } from '@/entities/address.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address])
  ],
  providers: [AddressService]
})
export class AddressModule {}
