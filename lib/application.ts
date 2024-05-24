import * as http from 'http';
import { DIContainer } from './di';

export class Application {
  private readonly server: http.Server;
  private controllers: any[] = [];

  constructor(private readonly module: any) {
    this.server = http.createServer(this.requestHandler.bind(this));
    this.initializeModule();
  }

  private initializeModule() {
    const controllers = Reflect.getMetadata('controllers', this.module) || [];
    const providers = Reflect.getMetadata('providers', this.module) || [];

    // 注册并实例化提供者
    providers.forEach(provider => {
      DIContainer.register(provider);
    });

    // 实例化控制器，并注入依赖
    this.controllers = controllers.map(controller => {
      const params = Reflect.getMetadata('design:paramtypes', controller) || [];
      const injections = params.map(param => DIContainer.resolve(param));

      return new controller(...injections);
    });
  }

  private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    for (const controller of this.controllers) {
      const prefix = Reflect.getMetadata('prefix', controller.constructor);
      const routes = Reflect.getMetadata('routes', controller.constructor) || [];

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