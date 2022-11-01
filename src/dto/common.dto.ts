import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsPositive } from 'class-validator'

export class BaseResponseDto {
	@ApiProperty({ description: '响应状态码', default: 200 })
	code: number

	@ApiProperty({ description: '请求路径' })
	path: string

	@ApiProperty({ description: '请求状态', default: true })
	success: boolean

	@ApiProperty({ description: '请求时间戳' })
	timestamp: string

	@ApiProperty({ description: '请求结果信息', default: '请求成功' })
	message: string
}

export class PagingDto {
	@ApiProperty({ description: '分页页码', default: 1 })
	@Type(() => Number)
	@IsPositive({ message: '页码必须大于0' })
	PageNumber: number

	@ApiProperty({ description: '分页大小', default: 10 })
	@Type(() => Number)
	@IsPositive({ message: '分页size必须大于0' })
	PageSize: number

	@ApiProperty({ description: '分页总数' })
	@IsPositive()
	totalNum: number

	@ApiProperty({ description: '共多少页' })
	totalPage: number
}
