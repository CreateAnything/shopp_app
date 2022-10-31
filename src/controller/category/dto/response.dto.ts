import {
	ApiExtraModels,
	ApiPropertyOptional,
	PartialType
} from '@nestjs/swagger'
export class CategoryResponseDto {
	@ApiPropertyOptional({ description: '分类id' })
	cateid: string

	@ApiPropertyOptional({ description: '父类别编号,为0表示根节点' })
	parentid: string

	@ApiPropertyOptional({ description: '类别名称' })
	name: string

	@ApiPropertyOptional({
		description: '类别状态(true可用,false弃用)',
		default: true
	})
	status: boolean

	@ApiPropertyOptional({ description: '类别排序' })
	sortorder: number
}
export class CategoryTreeDto extends PartialType(CategoryResponseDto) {
	@ApiPropertyOptional({
		description: '子分类',
		type: () => [CategoryResponseDto]
	})
	children: CategoryTreeDto[]
}
