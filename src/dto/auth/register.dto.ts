import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { BaseSuccessDto } from '../common/common.dto'
export class CreateUserDto {
	@ApiProperty({ description: '用户账号' })
	@IsNotEmpty({ message: '用户名不能为空' })
	readonly username: string

	@ApiProperty({ description: '用户密码' })
	@IsNotEmpty({ message: '密码不能为空' })
	readonly password: string

	@ApiPropertyOptional({ description: '用户头像' })
	readonly avatar?: string

	@ApiPropertyOptional({ description: '用户电话' })
	@MaxLength(20, { message: '手机位数不能超过12位' })
	readonly phone?: string

	@ApiPropertyOptional({ description: '重置密码的问题' })
	readonly question: string

	@ApiPropertyOptional({ description: '重置密码的答案' })
	readonly answer: string
}

export class ResponseUserData extends PartialType(CreateUserDto) {
	@ApiPropertyOptional({ description: '用户id' })
	readonly userid: string

	@ApiPropertyOptional({ description: '用户购物车', type: [String] })
	readonly carts: string[]
}

export class ResponseUserDto extends PartialType(BaseSuccessDto) {
	@ApiPropertyOptional({
		description: '数据结果',
		type: PartialType(ResponseUserData),
	})
	data: ResponseUserData
}
