import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'

export function Auth(type = 'jwt') {
	return applyDecorators(UseGuards(new JwtAuthGuard(type)))
}
