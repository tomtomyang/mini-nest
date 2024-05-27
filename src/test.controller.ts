import { Controller, Get, Post, Req, Res, Request, Response } from '../lib';
import { Logger } from './common/logger';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private logger: Logger, private testService: TestService) {
  }

  @Get('/get')
  getHello(@Req() req: Request, @Res() res: Response): string {
    this.logger.log('request /test/get');
    return this.testService.getHello();
  }

  @Post('/post')
  postHello(@Req() req: Request): string {
    this.logger.log('request /test/post');
    return this.testService.postHello();
  }
}