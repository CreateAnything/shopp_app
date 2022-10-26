import { PickType } from '@nestjs/swagger'
import { CreateUserDto } from './register.dto'

export class LoginDto extends PickType(CreateUserDto, [
	'phone',
	'password',
] as const) {}
