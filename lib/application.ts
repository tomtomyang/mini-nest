import * as http from 'http';
import { SimpleReflect } from './reflect';

export class Application {
  private readonly server: http.Server;

  constructor(private readonly controllers: any[]) {
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    for (const controller of this.controllers) {
      const prefix = SimpleReflect.getMetadata('prefix', controller.constructor);
      const routes = SimpleReflect.getMetadata<any[]>('routes', controller.constructor) || [];

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