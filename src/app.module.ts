import { Module } from "../lib/decorator";
import { TestController } from "./test.controller";

@Module({
  controllers: [TestController],
})
export class AppModule {}
