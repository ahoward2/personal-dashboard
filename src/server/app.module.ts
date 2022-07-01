import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { join } from "path";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "dist", "client"),
      exclude: ["api*"],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
