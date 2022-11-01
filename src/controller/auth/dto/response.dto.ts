import { ApiPropertyOptional } from '@nestjs/swagger'

export class LoginDataDto {
	@ApiPropertyOptional({ description: '用户id' })
	userid: string

	@ApiPropertyOptional({ description: '登录token' })
	token: string

	@ApiPropertyOptional({ description: '用户昵称' })
	username: string

	@ApiPropertyOptional({ description: '用户手机号' })
	phone: number

	@ApiPropertyOptional({ description: '头像' })
	avatar: string
}
