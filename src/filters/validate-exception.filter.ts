import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import {
	ResponseErr,
	BackErrorResponse,
	ErrorMessage,
	MyHttpException,
	HttpResponseType,
} from './types'
@Catch(HttpException)
export class ValidateExceptionFilter<T> implements ExceptionFilter {
	catch(exception: MyHttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const request = ctx.getRequest<Request>()
		const response = ctx.getResponse<Response>()
		//判断是否为请求异常，否则直接抛服务器错误
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR
		//包装错误信息
		const HttpResponse = exception.getResponse() as HttpResponseType
		const errorResponse: BackErrorResponse<ErrorMessage[] | string> = {
			code: HttpResponse.code,
			path: request.url,
			success: false,
			timestamp: new Date().toISOString(),
			message: HttpResponse.message,
		}
		if (exception instanceof BadRequestException) {
			//如果是参数异常的情况
			const responseObject: ResponseErr = exception.getResponse() as ResponseErr
			errorResponse.message = responseObject.message.map((error: string) => {
				const errInfo = error.split(':')
				return {
					field: errInfo[0],
					message: errInfo[1],
				} as unknown as ErrorMessage
			})
			errorResponse.code = HttpStatus.UNPROCESSABLE_ENTITY
			return response
				.status(HttpStatus.UNPROCESSABLE_ENTITY)
				.json(errorResponse)
		}
		return response.status(status).json(errorResponse)
	}
}
