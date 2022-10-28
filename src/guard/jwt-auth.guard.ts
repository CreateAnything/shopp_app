import {
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthErrCode } from '@/code/index'
interface InfoErrType {
	name: string
	message: string
	expiredAt?: string
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}
	handleRequest(err: object, user: any, info: object) {
		if (user) return user
		if (!info) throw new UnauthorizedException(AuthErrCode.UnauthorizedToken)
		const infoErr = JSON.parse(JSON.stringify(info)) as InfoErrType
		if (infoErr.name === 'TokenExpiredError') {
			throw new HttpException(AuthErrCode.AuthExpired, HttpStatus.UNAUTHORIZED)
		}
		throw new UnauthorizedException(AuthErrCode.UnauthorizedToken)
	}
}
