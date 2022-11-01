import { AuthErrCode } from '@/code'
import { Role, User } from '@/entities/user.entity'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const user = context.switchToHttp().getRequest().user as User
		const roles = this.reflector.getAllAndMerge<Role[]>('roles', [
			context.getHandler(),
			context.getClass()
		])
		if (roles.length > 0) {
			const hasRole: boolean = roles.some(role => user.role === role)
			if (hasRole) return true
			throw new UnauthorizedException(AuthErrCode.RoleNotEnough)
		}
		return true
	}
}
