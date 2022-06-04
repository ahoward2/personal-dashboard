import { Module } from "@nestjs/common";
import { DetailsModule } from "./details/details.module";

@Module({
  imports: [DetailsModule],
})
export class ApiModule {}
