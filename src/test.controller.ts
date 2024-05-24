import { Controller, Get, Post } from '../lib';

@Controller('/test')
export class TestController {
  // constructor(private testService: TestService) {}

  @Get('/get')
  getHello(): string {
    return 'Hello World with GET!';
  }

  @Post('/post')
  postHello(): string {
    return 'Hello World with POST!';
  }
}