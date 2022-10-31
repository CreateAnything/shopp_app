import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class CreareCategoryDto {
	@ApiProperty({ description: '父类别编号,为0表示根节点' })
	@IsNotEmpty({ message: 'parentid不能为空' })
	@IsString()
	parentid: string

	@ApiProperty({ description: '类别名称' })
	@IsNotEmpty({ message: 'name不能为空' })
	@IsString()
	name: string

	@ApiPropertyOptional({
		description: '类别状态(true可用,false弃用)',
		default: true
	})
	@IsBoolean()
	status: boolean

	@ApiPropertyOptional({ description: '类别排序' })
	@IsNumber()
	sortorder: number
}
