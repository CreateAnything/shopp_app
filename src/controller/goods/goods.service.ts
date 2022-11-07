import { GoodsErrCode } from '@/code/index'
import uploadConfig from '@/config/upload.config'
import { Goods } from '@/entities/goods.entity'
import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException
} from '@nestjs/common'
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

	private getColum(length: number, num: number = 0): string[] {
		let chars: string[] = []
		for (let i = 0; i < length; i++) {
			let chart = String.fromCharCode(65 + i)
			if (num === 0) {
				chars.push(chart)
			} else {
				chars.push(chart.padEnd(2, String(num)))
			}
		}
		return chars
	}

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

	private GetCellValue() {
		const mapKey = {}
		for (let [index, value] of this.select.entries()) {
			mapKey[index + 1] = value
		}
		return function (
			target: Record<string, any>,
			key: number,
			value: ExcelJS.CellValue
		) {
			target[mapKey[key]] = value
		}
	}
	async UPLOADEXCLE(
		file: Express.Multer.File,
		userid: string
	): Promise<string> {
		const { buffer } = file
		const workBook = new ExcelJS.Workbook()
		await workBook.xlsx.load(buffer) //加载buffer文件
		const worksheet = workBook.getWorksheet(1) //获取excle表格的第一个sheet
		const MergeCellValue = this.GetCellValue()
		const result = []
		worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
			//遍历每一行
			if (rowNumber > 1) {
				const target = {}
				row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
					MergeCellValue(target, colNumber, cell.value)
				})
				target['userid'] = userid
				result.push(target)
			} else {
				//验证模板错误
				const headerRow = this.getColum(this.select.length)
				headerRow.forEach((item, index) => {
					if (this.select[index] !== row.getCell(item).value)
						throw new HttpException(
							GoodsErrCode.TemplateErr,
							HttpStatus.BAD_REQUEST
						)
				})
			}
		}) //开始导入
		const res = await this.goodsRepository
			.createQueryBuilder()
			.insert()
			.into(Goods)
			.values(result)
			.execute()
		return res.raw.info
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
		workbook.addWorksheet('goods')
		const worksheet = workbook.getWorksheet('goods')
		const headerRow = this.getColum(this.select.length, 1)
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
