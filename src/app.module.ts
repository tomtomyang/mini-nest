import { Module } from "../lib";

import { LogService } from './common/log.service'
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
  controllers: [TestController],
  providers: [LogService, TestService]
})
export class AppModule {}
