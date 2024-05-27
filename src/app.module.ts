import { Module } from "../lib";

import { Logger } from './common/logger'
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
  controllers: [TestController],
  providers: [Logger, TestService]
})
export class AppModule {}
