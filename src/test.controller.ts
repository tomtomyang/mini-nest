import { Controller, Get, Post } from '../lib';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private testService: TestService) {
  console.log("🚀 ~ TestController ~ testService:", testService)
  }

  @Get('/get')
  getHello(): string {
    return this.testService.getHello();
  }

  @Post('/post')
  postHello(): string {
    return this.testService.postHello();
  }
}