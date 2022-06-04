import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "dist", "client"),
      exclude: ["api*"],
    }),
    ApiModule,
  ],
})
export class AppModule {}
