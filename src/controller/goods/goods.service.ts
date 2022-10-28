import { Goods } from '@/entities/goods.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class GoodsService {
	constructor(
		@InjectRepository(Goods) private goodsRepository: Repository<Goods>
	) {}
	async createGoods() {
		return '12'
	}
}
