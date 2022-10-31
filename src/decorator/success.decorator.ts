import { BaseResponseDto } from '@/dto/common.dto'
import { applyDecorators, Type } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import {
	ReferenceObject,
	SchemaObject
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
type ResultType<T> = {
	model: T
	type: SchemaType
}
type ApiResult = <T extends Type<any>>(options?: ResultType<T>) => any
type SchemaType = 'array' | 'object' | 'string' | 'number' | 'boolean'
export const DefaultResponse: any = () => {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				allOf: [{ $ref: getSchemaPath(BaseResponseDto) }]
			}
		})
	)
}

export const ResponseOk: ApiResult = options => {
	const { type } = options
	let props: Record<string, SchemaObject | ReferenceObject> = { data: {} }
	if (type === 'array') {
		props.data = {
			type,
			items: { $ref: getSchemaPath(options.model) }
		}
	} else if (type === 'object') {
		props.data = {
			type,
			$ref: getSchemaPath(options.model)
		}
	} else {
		props.data = {
			type
		}
	}
	return applyDecorators(
		ApiExtraModels(options.model),
		ApiOkResponse({
			schema: {
				allOf: [{ $ref: getSchemaPath(BaseResponseDto) }],
				properties: props
			}
		})
	)
}
