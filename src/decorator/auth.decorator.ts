import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

export function Auth(type = 'jwt') {
	return applyDecorators(UseGuards(new JwtAuthGuard(type)), ApiBearerAuth(type))
}
