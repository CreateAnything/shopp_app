import { CategoryErrCode } from '@/code/index'
import { Category } from '@/entities/category.entity'
import { orderByTree } from '@/utils/index'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreareCategoryDto } from './dto/request.dto'
import { CategoryResponseDto, CategoryTreeDto } from './dto/response.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepository: Repository<Category>
	) {}
	async CREATE(CreareCategoryDto: CreareCategoryDto): Promise<void> {
		await this.categoryRepository.save(CreareCategoryDto)
	}

	async UPDATE(
		id: string,
		CreareCategoryDto: CreareCategoryDto
	): Promise<void> {
		const res = await this.categoryRepository.update(id, CreareCategoryDto)
		if (res.affected === 0)
			throw new NotFoundException(CategoryErrCode.NotFound)
	}

	async FINDBYID(id: string): Promise<CategoryResponseDto> {
		const res = await this.categoryRepository.findOne({ where: { cateid: id } })
		if (res) return res
		throw new NotFoundException(CategoryErrCode.NotFound)
	}

	async FINDALL(): Promise<CategoryResponseDto[]> {
		return await this.categoryRepository.find()
	}

	async DELETE(id: string): Promise<void> {
		const res = await this.categoryRepository.delete({ cateid: id })
		if (res.affected === 0)
			throw new NotFoundException(CategoryErrCode.NotFound)
	}

	async TOTREELIST(): Promise<CategoryTreeDto[]> {
		const res = await this.FINDALL()
		return orderByTree({
			parentKey: 'parentid',
			idKey: 'cateid',
			sortKey: 'sortorder',
			data: res
		})
	}
}
