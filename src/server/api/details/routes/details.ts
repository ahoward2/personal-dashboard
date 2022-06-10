import axios from "axios";
import { Request, Response } from "express";
import { Logger } from "@nestjs/common";

const logger = new Logger("DETAIL_ROUTE");

const cache = {
  ttl: 86400, // seconds
  startTime: Date.now(),
  cacheSetOnce: false,
  data: {
    key: null,
    value: {},
  },
};

async function useCache(req: Request, res: Response) {
  if (cache.data.key === null) {
    cache.data.key = req.path;
  }
  const timePassed = Date.now() - cache.startTime;
  if (
    Math.floor(timePassed / 1000) >= cache.ttl ||
    cache.cacheSetOnce === false
  ) {
    logger.log("Set value to cache");
    const data = await handler(req, res);
    cache.data.value = data;
    cache.startTime = Date.now();
    cache.cacheSetOnce = true;
  } else {
    logger.log("Value pulled from cache");
  }
  res.json(cache.data.value);
}

/**
 * Aggregates fetches from multiple API endpoints about
 * a user's details.
 */
async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    // Make Concurrent API calls
    let data = {};

    async function getGithubData() {
      return axios.get(`https://api.github.com/users/ahoward2`);
    }

    async function getRepos() {
      return axios.get(`https://api.github.com/users/ahoward2/repos`);
    }

    async function getGitlabData() {
      return axios.get(`https://gitlab.com/api/v4/users?username=ahoward21`);
    }

    await Promise.all([getGithubData(), getGitlabData(), getRepos()])
      .then((result) => {
        let totalStars = 0;

        result[2].data.forEach((repo) => {
          totalStars += repo?.stargazers_count ?? 0;
        });

        const { login, followers, public_repos } = result[0]?.data ?? {};

        const { username } = result[1]?.data ?? {};

        data = {
          github: { login, followers, public_repos, total_stars: totalStars },
          gitlab: { username },
        };
      })
      .catch((error) => {
        console.error(error);
      });
    return data;
  }
}

export const RouteConfig = {
  path: "/details",
  handler: useCache,
};
