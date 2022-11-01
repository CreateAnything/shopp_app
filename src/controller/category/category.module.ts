import { Category } from '@/entities/category.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoryService],
	controllers: [CategoryController],
	exports: [CategoryService]
})
export class CategoryModule {}
