import { OrderItem } from '@/entities/orderitem.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderitemService } from './orderitem.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([OrderItem])
  ],
  providers: [OrderitemService]
})
export class OrderitemModule {}
