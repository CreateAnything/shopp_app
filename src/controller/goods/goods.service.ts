import { GoodsErrCode } from '@/code/index'
import uploadConfig from '@/config/upload.config'
import { Goods } from '@/entities/goods.entity'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import * as ExcelJS from 'exceljs'
import * as fs from 'fs'
import { FindOptionsSelectByString, Like, Repository } from 'typeorm'
import { CategoryService } from '../category/category.service'
import {
	CreateGoodsDto,
	ExportGoodsDto,
	PagingGoodsDto
} from './dto/request.dto'
import { ResponsePagingDto } from './dto/response.dto'

@Injectable()
export class GoodsService {
	constructor(
		@InjectRepository(Goods) private goodsRepository: Repository<Goods>,
		private readonly categoryService: CategoryService,
		@Inject(uploadConfig.KEY)
		private readonly UploadConfig: ConfigType<typeof uploadConfig>
	) {}

	private readonly uplaodPath: string = `${this.UploadConfig.fileTemplate}/产品导入下载模板.xlsx`

	private readonly select = [
		'cateid',
		'name',
		'subtitle',
		'mainimage',
		'price',
		'stock',
		'status'
	] as FindOptionsSelectByString<Goods>

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
		PageSize,
		name,
		cateid,
		userid
	}: PagingGoodsDto): Promise<ResponsePagingDto> {
		const skip = (PageNumber - 1) * PageSize
		const take = PageSize
		let whereParams: Record<string, any> = {}
		name && Object.assign(whereParams, { name: Like(`%${name}%`) })
		cateid && Object.assign(whereParams, { cateid: cateid })
		userid && Object.assign(whereParams, { userid: userid })
		const [goods, totalNum] = await this.goodsRepository.findAndCount({
			where: whereParams,
			order: { createdAt: 'DESC' },
			skip,
			take
		})
		const totalPage = Math.ceil(totalNum / take)
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

	async UPLOADEXCLE(file: Express.Multer.File): Promise<void> {
		const { buffer } = file
		const workBook = new ExcelJS.Workbook()
		await workBook.xlsx.load(buffer) //加载buffer文件
		const worksheet = workBook.getWorksheet(1) //获取excle表格的第一个sheet
		worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
			console.log(row, rowNumber)
		})
	}

	async DOWNFILL(): Promise<{ path: string }> {
		//检查文件是否存在
		if (!fs.existsSync(this.uplaodPath)) await this.CREATEEXCEL()
		return { path: this.uplaodPath }
	}

	async EXPORTFILE(dto: ExportGoodsDto): Promise<ExcelJS.Buffer> {
		const whereSelect: Record<string, any> = {}
		dto.name && Object.assign(whereSelect, { name: Like(`%${dto.name}%`) })
		dto.cateid && Object.assign(whereSelect, { cateid: dto.cateid })
		dto.userid && Object.assign(whereSelect, { userid: dto.userid })
		const result = await this.goodsRepository.find({
			select: this.select,
			where: whereSelect,
			order: { createdAt: 'DESC' }
		})
		const workBook = new ExcelJS.Workbook()
		workBook.addWorksheet('exportGoods')
		const worksheet = workBook.getWorksheet('exportGoods')
		worksheet.columns = this.select.map(item => {
			return {
				header: item,
				key: item,
				width: 20
			}
		})

		worksheet.addRows(result)
		return await workBook.xlsx.writeBuffer()
	}

	private async CREATEEXCEL(): Promise<void> {
		const workbook = new ExcelJS.Workbook()
		const headerRow = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1']
		workbook.addWorksheet('goods')
		const worksheet = workbook.getWorksheet('goods')
		worksheet.columns = this.select.map(item => {
			//设置列
			return {
				header: item,
				key: item,
				width: 20
			}
		})
		headerRow.forEach(item => {
			//设置样式
			worksheet.getCell(item).font = {
				color: { argb: 'FFC0000' },
				size: 14,
				bold: true
			}
			worksheet.getCell(item).alignment = {
				vertical: 'middle',
				horizontal: 'center'
			}
		})
		worksheet.addRow({
			//注入默认数据
			cateid: '53b151c9-fcb6-4969-9c58-67e38b887a4b',
			name: '秋季短裤',
			subtitle: '2022特价',
			mainimage: 'public/uploads/image/1667295304477.jpg',
			price: 100,
			stock: 10,
			status: 0
		})
		await workbook.xlsx.writeFile(this.uplaodPath)
	}
}
