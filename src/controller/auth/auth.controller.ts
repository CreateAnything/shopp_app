import { LoginDto } from '@/dto/request/auth/login.dto'
import { CreateUserDto } from '@/dto/request/auth/register.dto'
import { LoginDataDto, LoginResponseDto } from '@/dto/response/auth/login.dto'
import { RegisterResponseDto } from '@/dto/response/auth/register.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('register')
	@ApiOkResponse({ status: 200, type: RegisterResponseDto }) //请求成功响应体
	@ApiOperation({ summary: '注册用户' })
	async userRegister(@Body() dto: CreateUserDto): Promise<void> {
		await this.authService.register(dto)
	}

	@Post('login')
	@ApiOkResponse({ status: 200, type: LoginResponseDto }) //请求成功响应体
	@ApiOperation({ summary: '用户登录' })
	async userLogin(@Body() dto: LoginDto): Promise<LoginDataDto> {
		return await this.authService.login(dto)
	}
}
