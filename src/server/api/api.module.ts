import { Module } from "@nestjs/common";
import { ApiService } from "./api.service";
import { DetailsModule } from "./details/details.module";

@Module({
  imports: [DetailsModule],
  providers: [ApiService],
})
export class ApiModule {}
