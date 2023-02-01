type handler = (e: Error) => void;

const loggers: handler[] = [
  console.error.bind(console)
];

export function registerHandler(fn: handler): void {
  loggers.push(fn);
}

export function unregisterHandler(fn: handler): void {
  const index = loggers.indexOf(fn);
  if (index >= 0) {
    loggers.splice(index, 1);
  }
}

export function notify(e: Error, methodName?: string): void {
  if (methodName) {
    e.message += ". Method name - " + methodName;
  }
  loggers.forEach(fn => fn(e));
}
