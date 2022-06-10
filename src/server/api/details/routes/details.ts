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

    async function getGitlabData() {
      return axios.get(`https://gitlab.com/api/v4/users?username=ahoward21`);
    }

    await Promise.all([getGithubData(), getGitlabData()])
      .then((result) => {
        data = {
          github: result[0].data,
          gitlab: result[1].data,
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
