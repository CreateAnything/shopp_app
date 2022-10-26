import { CreateUserDto, ResponseUserDto } from '@/dto/auth/register.dto'
import { AuthErrCode } from '@/code/index'
import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth') //swagger中模块标题
export class AuthController {
	@Post('register')
	@ApiOkResponse({ status: 200, type: ResponseUserDto }) //请求成功响应体
	@ApiOperation({ summary: '用户注册' })
	registerUser(@Body() body: CreateUserDto): any {}
}
