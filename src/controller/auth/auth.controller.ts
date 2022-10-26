import { Auth } from '@/decorator/auth.decorator'
import { User } from '@/decorator/user.decorator'
import { LoginDto } from '@/dto/auth/login.dto'
import { CreateUserDto, ResponseUserDto } from '@/dto/auth/register.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('register')
	@ApiOkResponse({ status: 200, type: ResponseUserDto }) //请求成功响应体
	@ApiOperation({ summary: '注册用户' })
	async userRegister(@Body() dto: CreateUserDto): Promise<any> {
		return await this.authService.register(dto)
	}

	@Post('login')
	@ApiOperation({ summary: '用户登录' })
	async userLogin(@Body() dto: LoginDto) {
		return await this.authService.login(dto)
	}

	@Get('all')
	@ApiOperation({ summary: '获取全部用户' })
	@Auth()
	async findAllUser(@User() user: any) {
		return user
	}
}
