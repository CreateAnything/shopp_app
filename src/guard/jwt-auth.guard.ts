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
		let infoErr: InfoErrType = JSON.parse(JSON.stringify(info))
		if (infoErr.message === 'jwt expired') {
			throw new HttpException(AuthErrCode.AuthExpired, HttpStatus.UNAUTHORIZED)
		}
		throw new UnauthorizedException(AuthErrCode.UnauthorizedToken)
	}
}
