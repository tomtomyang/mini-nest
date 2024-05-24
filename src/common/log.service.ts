import { Injectable } from '../../lib';

@Injectable()
export class LogService {
  log(...args) {
    console.log(...args)
  }

  error(...args) {
    console.error(...args)
  }
}
