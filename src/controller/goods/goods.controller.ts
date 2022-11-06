import { DefaultResponse, ResponseOk } from '@/decorator/success.decorator'
import { ExcleUpload } from '@/decorator/upload.decorator'
import { GetUser } from '@/decorator/user.decorator'
import { User } from '@/entities/user.entity'
import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
	UploadedFile
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import * as ExcelJS from 'exceljs'
import { Response } from 'express'
import { FileUploadDto } from '../upload/dto/request.dto'
import {
	CreateGoodsDto,
	ExportGoodsDto,
	PagingGoodsDto
} from './dto/request.dto'
import { ResponsePagingDto } from './dto/response.dto'
import { GoodsService } from './goods.service'
@Controller('goods')
@ApiTags('Goods')
@ApiBearerAuth('jwt')
// @Auth(Role.COMMON)
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
	async pagingGoods(
		@Query() query: PagingGoodsDto
	): Promise<ResponsePagingDto> {
		return await this.goodsService.SEARCHLIST(query)
	}

	@Post()
	@ExcleUpload()
	@ApiOperation({ summary: '通过exlce批量添加商品' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: '请选择文件', type: FileUploadDto })
	@DefaultResponse()
	async uploadExcle(@UploadedFile() file: Express.Multer.File): Promise<void> {
		this.goodsService.UPLOADEXCLE(file)
	}

	@Get('/export')
	@ApiOperation({ summary: '批量导出商品信息' })
	@DefaultResponse()
	async exportExcel(@Query() query: ExportGoodsDto): Promise<ExcelJS.Buffer> {
		return await this.goodsService.EXPORTFILE(query)
	}

	@Get('/download')
	@ApiOperation({ summary: '下载产品导入模板' })
	@DefaultResponse()
	async downFile(@Res() res: Response): Promise<void> {
		const { path } = await this.goodsService.DOWNFILL()
		res.download(path)
	}
}
