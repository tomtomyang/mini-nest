import { Injectable } from '../lib';

@Injectable()
export class TestService {
  getHello(): string {
    return 'Hello World with GET from TestService!';
  }

  postHello(): string {
    return 'Hello World with POST from TestService!';
  }
}
