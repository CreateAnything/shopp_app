import {
	Injectable,
	ValidationPipe,
	ValidationPipeOptions
} from '@nestjs/common'
import { ValidationError } from 'class-validator'

@Injectable()
export class ValidatePipe extends ValidationPipe {
	constructor(validatorOptions?: ValidationPipeOptions) {
		super(validatorOptions)
	}
	//重写错误类
	protected mapChildrenToValidationErrors(
		error: ValidationError,
		parentPath?: string
	): ValidationError[] {
		const errors: ValidationError[] = super.mapChildrenToValidationErrors(
			error,
			parentPath
		)
		errors.map(error => {
			for (const key in error.constraints) {
				if (key === 'whitelistValidation')
					error.constraints[key] = `属性${error.property}未定义`
				error.constraints[key] = error.property + ':' + error.constraints[key]
			}
		})
		return errors
	}
}
