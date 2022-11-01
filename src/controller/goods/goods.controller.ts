import { Auth } from '@/decorator/auth.decorator'
import { DefaultResponse, ResponseOk } from '@/decorator/success.decorator'
import { GetUser } from '@/decorator/user.decorator'
import { Role, User } from '@/entities/user.entity'
import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { CreateGoodsDto, PagingGoodsDto } from './dto/request.dto'
import { ResponsePagingDto } from './dto/response.dto'
import { GoodsService } from './goods.service'
@Controller('goods')
@ApiTags('Goods')
@ApiBearerAuth('jwt')
@Auth(Role.COMMON)
export class GoodsController {
	constructor(private readonly goodsService: GoodsService) {}
	@Post('add')
	@ApiOperation({ summary: '添加商品' })
	@DefaultResponse()
	async addGoods(
		@Body() CreateGoodsDto: CreateGoodsDto,
		@GetUser() user: User
	): Promise<void> {
		await this.goodsService.CREATE(CreateGoodsDto, user.userid)
	}

	@Patch('update:id')
	@ApiOperation({ summary: '修改商品' })
	@DefaultResponse()
	async updateGoods(
		@Param('id') id: string,
		@Body() CreateGoodsDto: CreateGoodsDto
	) {
		await this.goodsService.UPDATE(id, CreateGoodsDto)
	}

	@Get('list:id')
	@ApiOperation({ summary: '根据id获取商品' })
	@ResponseOk({ model: CreateGoodsDto, type: 'object' })
	async findGoodsByid(@Param('id') id: string): Promise<CreateGoodsDto> {
		return await this.goodsService.FINDBYID(id)
	}

	@Get('list')
	@ApiOperation({ summary: '查找全部商品' })
	@ResponseOk({ model: CreateGoodsDto, type: 'array' })
	async findAllGoods(): Promise<CreateGoodsDto[]> {
		return await this.goodsService.FINDALL()
	}

	@Get('search')
	@ApiOperation({ summary: '分页查询商品' })
	@ResponseOk({ model: ResponsePagingDto, type: 'object' })
	@ApiQuery({ name: 'search', type: PagingGoodsDto })
	async pagingGoods(
		@Query() query: PagingGoodsDto
	): Promise<ResponsePagingDto> {
		return await this.goodsService.SEARCHLIST(query)
	}
}
