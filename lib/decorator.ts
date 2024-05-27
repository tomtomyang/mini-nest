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

export function Injectable(): ClassDecorator {
  return function (constructor: Function) {
    // do nothing
  };
}

export function Controller(prefix: string = ''): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('prefix', prefix, target);
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
}

function createRouteDecorator(method: string) {
  return (path: string = ''): MethodDecorator => {
    return (target, key, descriptor) => {
      const routes = Reflect.getMetadata('routes', target.constructor) || [];

      routes.push({
        requestMethod: method,
        path,
        methodName: key as string,
      });

      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');

function createParamDecorator(type: string) {
  return function(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const parameters: any[] = Reflect.getMetadata('parameters', target.constructor, propertyKey) || [];

    parameters.push({
      type,
      index: parameterIndex
    });

    Reflect.defineMetadata('parameters', parameters, target.constructor, propertyKey);
  };
}

export const Req = () => createParamDecorator('request');
export const Res = () => createParamDecorator('response');
