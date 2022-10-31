import { LoginDto, CreateUserDto } from './dto/request.dto'
import { LoginDataDto, LoginResponseDto } from './dto/response.dto'
import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Post,
	UseInterceptors
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { BaseResponseDto } from '@/dto/common.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('register')
	@ApiOkResponse({ status: 200, type: BaseResponseDto }) //请求成功响应体
	@ApiOperation({ summary: '注册用户' })
	async userRegister(@Body() dto: CreateUserDto): Promise<void> {
		await this.authService.register(dto)
	}

	@Post('login')
	@UseInterceptors(ClassSerializerInterceptor)
	@ApiOkResponse({ status: 200, type: LoginResponseDto }) //请求成功响应体
	@ApiOperation({ summary: '用户登录' })
	async userLogin(@Body() dto: LoginDto): Promise<LoginDataDto> {
		return await this.authService.login(dto)
	}
}
