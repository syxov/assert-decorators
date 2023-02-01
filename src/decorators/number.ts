import "reflect-metadata";
import { notify } from '../config';
import { isNumber } from 'lodash-es';

const numberMetadataKey = Symbol("number");

export function number(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(numberMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(numberMetadataKey, existingRequiredParameters, target, propertyKey);
}

export function numberValidation(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>, methodName?: string): void {
  let numberParameters: number[] | undefined = Reflect.getOwnMetadata(numberMetadataKey, target, propertyName);
  if (numberParameters && numberParameters.length) {
    for (let parameterIndex of numberParameters) {
      if (!isNumber(arguments[parameterIndex])) {
        notify(new Error("Argument is not a number. Arg index - " + parameterIndex), methodName);
      }
    }
  }
}
