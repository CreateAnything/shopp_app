import { ApiProperty, OmitType } from '@nestjs/swagger'

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
