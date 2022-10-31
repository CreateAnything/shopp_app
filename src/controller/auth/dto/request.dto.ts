import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'
export class CreateUserDto {
	@ApiProperty({ description: '用户账号' })
	@IsNotEmpty({ message: '用户名不能为空' })
	username: string

	@ApiProperty({ description: '用户密码', default: 123456 })
	@IsNotEmpty({ message: '密码不能为空' })
	password: string

	@ApiPropertyOptional({ description: '用户头像' })
	avatar?: string

	@ApiPropertyOptional({ description: '用户电话', default: 17306520114 })
	@IsNotEmpty({ message: '电话号码不能为空' })
	@MaxLength(20, { message: '手机位数不能超过12位' })
	phone: string

	@ApiPropertyOptional({ description: '重置密码的问题' })
	question: string

	@ApiPropertyOptional({ description: '重置密码的答案' })
	answer: string
}

export class LoginDto extends PickType(CreateUserDto, [
	'phone',
	'password'
] as const) {}
