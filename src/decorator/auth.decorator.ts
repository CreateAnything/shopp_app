import { Role } from '@/entities/user.entity'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RoleGuard } from '@/guard/role.guard'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

export function Auth(...roles: Role[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(new JwtAuthGuard('jwt'), RoleGuard),
		ApiBearerAuth('jwt')
	)
}
