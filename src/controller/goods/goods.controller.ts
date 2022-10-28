import { Auth } from '@/decorator/auth.decorator'
import { Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GoodsService } from './goods.service'
@Controller('goods')
@ApiTags('Goods')
@ApiBearerAuth('jwt')
@Auth()
export class GoodsController {
	constructor(private readonly goodsService: GoodsService) {}
	@Post('add')
	@ApiOperation({ summary: '添加商品' })
	async addGoods(): Promise<string> {
		console.log('asasasa')
		return this.goodsService.createGoods()
	}
}
