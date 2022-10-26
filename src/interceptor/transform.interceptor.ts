import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Request } from 'express'
import { map, Observable } from 'rxjs'
export interface ReponseType<T = any> {
	code: number
	path: string
	success: true
	timestamp: string
	data: T
}
type ResultType = Observable<ReponseType> | Promise<Observable<ReponseType>>
@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): ResultType {
		const ctx = context.switchToHttp()
		const request: Request = ctx.getRequest()
		return next.handle().pipe(
			map(data => {
				return {
					code: 200,
					path: request.url,
					timestamp: new Date().toISOString(),
					success: true,
					data: data ? data : null,
				}
			}),
		)
	}
}
