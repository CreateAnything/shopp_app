import { Auth } from '@/decorator/auth.decorator'
import { DefaultResponse, ResponseOk } from '@/decorator/success.decorator'
import { Role } from '@/entities/user.entity'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CategoryService } from './category.service'
import { CreareCategoryDto } from './dto/request.dto'
import { CategoryResponseDto, CategoryTreeDto } from './dto/response.dto'

@Controller('category')
@ApiTags('Category')
@Auth()
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}
	@Post('add')
	@Auth(Role.ADMIN)
	@ApiOperation({ summary: '新增分类' })
	@DefaultResponse()
	async getCategory(
		@Body() CreareCategoryDto: CreareCategoryDto
	): Promise<void> {
		await this.categoryService.CREATE(CreareCategoryDto)
	}

	@Patch('update:id')
	@Auth(Role.ADMIN)
	@ApiOperation({ summary: '更新分类' })
	@DefaultResponse()
	async updateCategory(
		@Body() CreareCategoryDto: CreareCategoryDto,
		@Param('id') id: string
	): Promise<void> {
		await this.categoryService.UPDATE(id, CreareCategoryDto)
	}

	@Get('/list:id')
	@ApiOperation({ summary: '通过id获取分类' })
	@ResponseOk({ model: CategoryResponseDto, type: 'object' })
	async getCategoryByid(@Param('id') id: string): Promise<CategoryResponseDto> {
		return await this.categoryService.FINDBYID(id)
	}

	@Get('/list')
	@ApiOperation({ summary: '获取全部分类列表' })
	@ResponseOk({ model: CategoryResponseDto, type: 'array' })
	async findAllCategory(): Promise<CategoryResponseDto[]> {
		return await this.categoryService.FINDALL()
	}

	@Delete('/list/:id')
	@Auth(Role.ADMIN)
	@ApiOperation({ summary: '根据id删除分类' })
	@DefaultResponse()
	async removeCategoryByid(@Param('id') id: string): Promise<void> {
		await this.categoryService.DELETE(id)
	}

	@Get('/tree')
	@ApiOperation({ summary: '获取分类的树形结构' })
	@ResponseOk({ model: CategoryTreeDto, type: 'array' })
	async findCategoryTree(): Promise<CategoryTreeDto[]> {
		return await this.categoryService.TOTREELIST()
	}
}
