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