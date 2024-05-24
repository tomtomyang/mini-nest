import * as http from 'http';
import { iReflect } from './reflect';

export class Application {
  private readonly server: http.Server;
  private controllers: any[] = [];

  constructor(private readonly module: any) {
    this.server = http.createServer(this.requestHandler.bind(this));
    this.initializeModule();
  }

  private initializeModule() {
    const controllers = iReflect.getMetadata<any[]>('controllers', this.module) || [];
    // const providers = iReflect.getMetadata<any[]>('providers', this.module) || [];

    this.controllers = controllers.map(controller => new controller());

    // 如果有提供者，你可能需要一个更复杂的逻辑来处理它们
    // 例如，实现一个依赖注入容器来解析它们的依赖项
  }

  private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    for (const controller of this.controllers) {
      const prefix = iReflect.getMetadata('prefix', controller.constructor);
      const routes = iReflect.getMetadata<any[]>('routes', controller.constructor) || [];

      for (const route of routes) {
        if (req.url === `${prefix}${route.path}` && req.method === route.requestMethod) {
          const result = controller[route.methodName]();
          res.end(result);
          return;
        }
      }
    }
    res.end('Not Found');
  }

  listen(port: number, callback?: () => void) {
    this.server.listen(port, callback);
  }
}