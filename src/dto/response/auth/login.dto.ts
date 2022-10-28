import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { BaseSuccessDto } from '@/dto/common/common.dto'

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

export class LoginResponseDto extends PartialType(BaseSuccessDto) {
	@ApiPropertyOptional({ description: '数据', type: LoginDataDto })
	data: LoginDataDto
}
