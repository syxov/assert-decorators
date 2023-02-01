import { validate } from '../validate';
import { number } from './index';
import { registerHandler } from '../config';

class TestObj {
  @validate()
  testFn(@number x: any): void {}
}

let obj!: TestObj;

const stub = jest.fn();

registerHandler(stub);

beforeEach(() => {
  obj = new TestObj();
});

test('number', () => {
  obj.testFn(3);

  expect(stub).not.toBeCalled();

  obj.testFn('3');

  expect(stub).toBeCalled();
})
