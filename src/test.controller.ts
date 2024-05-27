import { Controller, Get, Post } from '../lib';
import { Logger } from './common/logger';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private logger: Logger, private testService: TestService) {
  }

  @Get('/get')
  getHello(): string {
    this.logger.log('request /test/get');
    return this.testService.getHello();
  }

  @Post('/post')
  postHello(): string {
    this.logger.log('request /test/post');
    return this.testService.postHello();
  }
}