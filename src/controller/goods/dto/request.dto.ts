import { PagingDto } from '@/dto/common.dto'
import { StatusType } from '@/entities/goods.entity'
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString
} from 'class-validator'

export class CreateGoodsDto {
	@ApiProperty({ description: '商品类型编号' })
	@IsNotEmpty()
	@IsString()
	cateid: string

	@ApiProperty({ description: '商品名称' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiPropertyOptional({ description: '商品副标题' })
	@IsString()
	subtitle: string

	@ApiPropertyOptional({ description: '商品主图' })
	@IsString()
	mainimage: string

	@ApiPropertyOptional({
		description: '商品图片',
		type: [String],
		default: ['public/uploads/image/1667295304477.jpg']
	})
	@IsNotEmpty()
	@Transform(({ value }) => value.join('-'))
	subimages: string

	@ApiPropertyOptional({ description: '商品详情' })
	@IsString()
	detail: string

	@ApiPropertyOptional({ description: '商品价格' })
	@IsNumber()
	price: number

	@ApiProperty({ description: '商品数量', default: 100 })
	@IsNumber()
	@IsPositive({ message: '商品数量须大于0' })
	stock: number

	@ApiPropertyOptional({
		enum: StatusType,
		description: '商品状态',
		default: StatusType.shelves
	})
	@IsEnum(StatusType)
	@Type(() => Number)
	status: StatusType
}
export class PagingGoodsDto extends PickType(PagingDto, [
	'PageNumber',
	'PageSize'
] as const) {
	@ApiPropertyOptional({ description: '分类id' })
	@IsOptional()
	@IsString()
	cateid?: string

	@ApiPropertyOptional({ description: '商品名称' })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ description: '用户id' })
	@IsOptional()
	@IsString()
	userid?: string
}

export class ExportGoodsDto extends PickType(PagingGoodsDto, [
	'cateid',
	'name',
	'userid'
]) {}
