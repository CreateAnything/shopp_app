import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

export function IsNotExistsRule(
	table: string,
	ValidationOptions?: ValidationOptions
) {
	return function (object: Record<string, any>, prepertyName: string) {
		registerDecorator({
			name: 'IsNotExistsRule',
			target: object.constructor,
			propertyName: prepertyName,
			constraints: [table],
			options: ValidationOptions,
			validator: IsUserAlreadyExistConstraint
		})
	}
}

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
	implements ValidatorConstraintInterface
{
	async validate(value: any, args: ValidationArguments) {
		return false
	}
}
