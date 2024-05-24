import { iReflect } from './reflect';

export function Controller(prefix: string = ''): ClassDecorator {
  return (target) => {
    iReflect.defineMetadata('prefix', prefix, target);
    if (!iReflect.hasMetadata('routes', target)) {
      iReflect.defineMetadata('routes', [], target);
    }
  };
}

function createRouteDecorator(method: string) {
  return (path: string = ''): MethodDecorator => {
    return (target, key, descriptor) => {
      const routes = iReflect.getMetadata<any[]>('routes', target.constructor) || [];

      routes.push({
        requestMethod: method,
        path,
        methodName: key as string,
      });

      iReflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');