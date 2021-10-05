import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from "typeorm";

export function IsExists(entityName: string, entityRepo: any, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityName, entityRepo],
      validator: IsExistsConstraints
    })
  }
}

@ValidatorConstraint({ name: 'IsExists' })
export class IsExistsConstraints implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const data = await getRepository(args.constraints[1])
      .find({
        where: {
          id: value
        }
      })
    if (data.length < 1) {
      return false
    }

    return true
  }
}
