import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as compression from "compression";
import { join } from "path";
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  app.useStaticAssets(join(process.cwd(), "public", "assets"));
  await app.listen(8080, "0.0.0.0");

  // Gracefully shutdown the server.
  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing server.");
    app.close();
  });
}
bootstrap();
