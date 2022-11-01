import { DefaultResponse, ResponseOk } from '@/decorator/success.decorator'
import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Post,
	UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto, LoginDto } from './dto/request.dto'
import { LoginDataDto } from './dto/response.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('register')
	@DefaultResponse()
	@ApiOperation({ summary: '注册用户' })
	async userRegister(@Body() dto: CreateUserDto): Promise<void> {
		await this.authService.register(dto)
	}

	@Post('login')
	@UseInterceptors(ClassSerializerInterceptor)
	@ResponseOk({ model: LoginDataDto, type: 'object' })
	@ApiOperation({ summary: '用户登录' })
	async userLogin(@Body() dto: LoginDto): Promise<LoginDataDto> {
		return await this.authService.login(dto)
	}
}
