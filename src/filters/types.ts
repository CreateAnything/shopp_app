import { HttpException } from '@nestjs/common'

export interface ResponseErr {
	statusCode: number
	message: string[]
	error: string
}
export interface BackErrorResponse<T = any> {
	code: number
	path: string
	success: boolean
	timestamp: string
	message: T
}
export interface ErrorMessage {
	filed: string
	message: string
}
export interface MyHttpException extends HttpException {
	code: number
}

export interface HttpResponseType {
	readonly code: number
	readonly message: string
}
