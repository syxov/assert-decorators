import "reflect-metadata";
import { numberValidation } from './decorators/number';

const validators: Array<(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>, methodName?: string) => void> = [
  numberValidation
];

export function validate(methodName?: string) {
  return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value!;

    descriptor.value = function () {
      validators.forEach(validator => {
        validator(target, propertyName, descriptor, methodName);
      });
      return method.apply(this, arguments);
    };
  }

}
