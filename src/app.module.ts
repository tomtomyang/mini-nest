import { Module } from "../lib";
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}
