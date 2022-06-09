import axios from "axios";
import { Request, Response } from "express";

/**
 * Aggregates fetches from multiple API endpoints about
 * a user's details.
 */
async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=86400");
    // Make Concurrent API calls
    axios
      .all([
        axios.get(`https://api.github.com/users/ahoward2`),
        axios.get(`https://gitlab.com/api/v4/users?username=ahoward21`),
      ])
      .then(
        axios.spread((githubData, gitlabData) => {
          res.json({
            github: githubData.data,
            gitlab: gitlabData.data,
          });
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }
}

export const RouteConfig = {
  path: "/details",
  handler,
};
