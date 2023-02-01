import "reflect-metadata";
import { numberValidation } from './decorators/number';

const validators: Array<(args: any[], target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>, methodName?: string) => void> = [
  numberValidation
];

export function validate(methodName?: string): (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => void {
  return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value!;

    descriptor.value = function (...args: unknown[]) {
      validators.forEach(validator => {
        validator(args, target, propertyName, descriptor, methodName);
      });
      return method.apply(this, args);
    };
  }

}
