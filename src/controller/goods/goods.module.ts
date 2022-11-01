import { Category } from '@/entities/category.entity'
import { Goods } from '@/entities/goods.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryService } from '../category/category.service'
import { GoodsController } from './goods.controller'
import { GoodsService } from './goods.service'

@Module({
	imports: [TypeOrmModule.forFeature([Goods, Category])],
	providers: [GoodsService, CategoryService],
	controllers: [GoodsController]
})
export class GoodsModule {}
