import { iReflect } from "./reflect";

export function Module(metadata: { controllers?: any[]; }): ClassDecorator {
  return function (constructor: Function) {
    iReflect.defineMetadata('controllers', metadata.controllers, constructor);
  };
}