import { Application } from '../lib';
import { TestController } from './test.controller';

async function bootstrap() {
  const app = new Application([new TestController()]);
  app.listen(3000, () => console.log('Application is listening on port 3000'));
}

bootstrap();