import { GoodsErrCode } from '@/code/index'
import { Goods } from '@/entities/goods.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryService } from '../category/category.service'
import { CreateGoodsDto, PagingGoodsDto } from './dto/request.dto'
import { ResponsePagingDto } from './dto/response.dto'

@Injectable()
export class GoodsService {
	constructor(
		@InjectRepository(Goods) private goodsRepository: Repository<Goods>,
		private readonly categoryService: CategoryService
	) {}

	async CREATE(CreateGoodsDto: CreateGoodsDto, userid: string): Promise<void> {
		await this.categoryService.FINDBYID(CreateGoodsDto.cateid)
		await this.goodsRepository.save({ ...CreateGoodsDto, userid })
	}

	async UPDATE(id: string, CreateGoodsDto: CreateGoodsDto): Promise<void> {
		await this.categoryService.FINDBYID(CreateGoodsDto.cateid)
		const res = await this.goodsRepository.update(id, CreateGoodsDto)
		if (res.affected === 0) throw new NotFoundException(GoodsErrCode.NotFound)
	}

	async FINDBYID(id: string): Promise<CreateGoodsDto> {
		const res = await this.goodsRepository.findOne({ where: { goodsId: id } })
		if (res) return res
		throw new NotFoundException(GoodsErrCode.NotFound)
	}

	async FINDALL(): Promise<CreateGoodsDto[]> {
		return this.goodsRepository.find()
	}

	async SEARCHLIST({
		PageNumber,
		PageSize
	}: PagingGoodsDto): Promise<ResponsePagingDto> {
		const skip = (PageNumber - 1) * PageSize
		const take = PageSize
		const totalNum = await this.goodsRepository.count()
		const totalPage = Math.ceil(totalNum / take)
		const goods = await this.goodsRepository
			.createQueryBuilder('goods')
			.skip(skip)
			.take(take)
			.getMany()
		return {
			items: goods,
			paging: {
				PageNumber,
				PageSize,
				totalNum,
				totalPage
			}
		}
	}
}
