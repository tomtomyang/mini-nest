import { Controller, Get, Post, Req, Res, Request, Response } from '../lib';
import { Logger } from './common/logger';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private logger: Logger, private testService: TestService) {
  }

  @Get('/get')
  getHello(@Req() req: Request): string {
    this.logger.log(req.method, req.url);
    return this.testService.getHello();
  }

  @Post('/post')
  postHello(): string {
    return this.testService.postHello();
  }
}