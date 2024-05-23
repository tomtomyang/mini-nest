import { Controller, Get, Post } from '../lib';

@Controller('/test')
export class TestController {
  @Get('/get')
  getHello(): string {
    return 'Hello World with GET!';
  }

  @Post('/post')
  postHello(): string {
    return 'Hello World with POST!';
  }
}