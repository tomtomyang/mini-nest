import { SimpleReflect } from './reflect';

export function Controller(prefix: string = ''): ClassDecorator {
  return (target) => {
    SimpleReflect.defineMetadata('prefix', prefix, target);
    if (!SimpleReflect.hasMetadata('routes', target)) {
      SimpleReflect.defineMetadata('routes', [], target);
    }
  };
}

function createRouteDecorator(method: string) {
  return (path: string = ''): MethodDecorator => {
    return (target, key, descriptor) => {
      const routes = SimpleReflect.getMetadata<any[]>('routes', target.constructor) || [];

      routes.push({
        requestMethod: method,
        path,
        methodName: key as string,
      });

      SimpleReflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');