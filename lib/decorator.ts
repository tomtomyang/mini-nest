export function Injectable(): ClassDecorator {
  return function (constructor: Function) {
    // do nothing
  };
}

export function Module(metadata: { controllers?: any[]; providers?: any[] }): ClassDecorator {
  return function (constructor: Function) {
    if (metadata?.controllers) {
      Reflect.defineMetadata('controllers', metadata.controllers, constructor);
    }
    if (metadata?.providers) {
      Reflect.defineMetadata('providers', metadata.providers, constructor);
    }
  };
}