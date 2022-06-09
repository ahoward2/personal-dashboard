import { All, Controller, Req, Res } from "@nestjs/common";
import { RouteConfig as DetailsConfig } from "./routes/details";

@Controller("api")
export class DetailsController {
  @All(DetailsConfig.path)
  async executeUserDetail(@Req() req, @Res() res) {
    return DetailsConfig.handler(req, res);
  }
}
