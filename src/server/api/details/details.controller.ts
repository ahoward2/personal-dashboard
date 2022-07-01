import { All, Controller, Req, Res } from "@nestjs/common";
import { useCache } from "../api.cache";
import { RouteConfig as DetailsConfig } from "./routes/details";
import { RouteConfig as GithubConfig } from "./routes/github";
import { RouteConfig as GitlabConfig } from "./routes/gitlab";
import { RouteConfig as TwitterConfig } from "./routes/twitter";

@Controller("api")
export class DetailsController {
  @All(DetailsConfig.path)
  async executeUserDetail(@Req() req, @Res() res) {
    return DetailsConfig.handler(req, res);
  }
  @All(GithubConfig.path)
  async executeGithubDetail(@Req() req, @Res() res) {
    return useCache(req, res, GithubConfig.handler);
  }
  @All(GitlabConfig.path)
  async executeGitlabDetail(@Req() req, @Res() res) {
    return useCache(req, res, GitlabConfig.handler);
  }
  @All(TwitterConfig.path)
  async executeTwitterDetail(@Req() req, @Res() res) {
    return useCache(req, res, TwitterConfig.handler);
  }
}
