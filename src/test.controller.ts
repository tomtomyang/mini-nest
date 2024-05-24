import { Controller, Get, Post } from '../lib';
import { LogService } from './common/log.service';

import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private logger: LogService, private testService: TestService) {
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