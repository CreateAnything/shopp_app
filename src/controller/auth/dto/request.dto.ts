import { Role } from '@/entities/user.entity'
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator'
export class CreateUserDto {
	@ApiProperty({ description: '用户账号' })
	@IsNotEmpty({ message: '用户名不能为空' })
	username: string

	@ApiProperty({ description: '用户密码', default: 123456 })
	@IsNotEmpty({ message: '密码不能为空' })
	password: string

	@ApiProperty({ description: '用户电话', default: 17306520114 })
	@IsNotEmpty({ message: '电话号码不能为空' })
	@MaxLength(11, { message: '电话号码长度不能超过11位' })
	phone: string

	@ApiProperty({
		description: '用户角色',
		enum: Role
	})
	@IsEnum(Role, { message: '未找到该角色类型' })
	role: Role

	@ApiPropertyOptional({ description: '用户头像' })
	@IsString()
	avatar?: string

	@ApiPropertyOptional({ description: '重置密码的问题' })
	@IsString()
	question: string

	@ApiPropertyOptional({ description: '重置密码的答案' })
	@IsString()
	answer: string
}

export class LoginDto extends PickType(CreateUserDto, [
	'phone',
	'password'
] as const) {}
