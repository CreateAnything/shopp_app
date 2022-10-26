import { Injectable, ValidationPipe } from '@nestjs/common'
import { ValidationError, ValidatorOptions } from 'class-validator'

@Injectable()
export class ValidatePipe extends ValidationPipe {
	//基础class-validator这个类进行扩展
	constructor(validatorOptions?: ValidatorOptions) {
		super(validatorOptions)
	}
	//重写错误类
	protected mapChildrenToValidationErrors(
		error: ValidationError,
		parentPath?: string,
	): ValidationError[] {
		const errors: ValidationError[] = super.mapChildrenToValidationErrors(
			error,
			parentPath,
		)
		errors.map(error => {
			for (const key in error.constraints) {
				error.constraints[key] = error.property + ':' + error.constraints[key]
			}
		})
		return errors
	}
}
