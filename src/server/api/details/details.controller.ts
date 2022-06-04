import {
  All,
  CacheInterceptor,
  Controller,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { RouteConfig as DetailsConfig } from "./routes/details";

@Controller("api")
// @UseInterceptors(CacheInterceptor)
export class DetailsController {
  @All(DetailsConfig.path)
  async executeUserDetail(@Req() req, @Res() res) {
    return DetailsConfig.handler(req, res);
  }
}
