import { createParamDecorator, ExecutionContext } from '@nestjs/common'
//参数装饰器
export const GetUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		return request.user
	}
)
