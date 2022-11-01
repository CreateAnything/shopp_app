import { PagingDto } from '@/dto/common.dto'
import { ApiProperty } from '@nestjs/swagger'
import { CreateGoodsDto } from './request.dto'

export class ResponsePagingDto {
	@ApiProperty({ description: '数据结果', type: () => [CreateGoodsDto] })
	items: CreateGoodsDto[]
	@ApiProperty({ description: '分页信息', type: () => PagingDto })
	paging: PagingDto
}
