import axios from "axios";
import { Request, Response } from "express";
import { Logger } from "@nestjs/common";
require("dotenv").config();

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

    async function getTwitterData() {
      return axios.get(
        `https://api.twitter.com/2/users/by/username/a_howard8?user.fields=public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
    }

    async function getTweetsTimeline() {
      return axios.get(
        `https://api.twitter.com/2/users/1438466852/tweets?exclude=retweets,replies&tweet.fields=public_metrics&max_results=91`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
    }

    await Promise.all([
      getGithubData(),
      getGitlabData(),
      getRepos(),
      getTwitterData(),
      getTweetsTimeline(),
    ])
      .then((result) => {
        let totalStars = 0;

        result[2].data.forEach((repo) => {
          totalStars += repo?.stargazers_count ?? 0;
        });

        const { login, followers, public_repos } = result[0]?.data ?? {};

        const { username } = result[1]?.data?.[0] ?? {};

        const { followers_count } = result[3]?.data?.data?.public_metrics ?? {};

        const { username: twitterUsername } = result[3]?.data?.data ?? {};

        let totalLikes = 0;
        let totalRetweets = 0;
        let totalReplies = 0;

        result[4].data.data.forEach((tweet) => {
          totalLikes += tweet?.public_metrics?.like_count ?? 0;
          totalRetweets += tweet?.public_metrics?.retweet_count ?? 0;
          totalReplies += tweet?.public_metrics?.replie_count ?? 0;
        });

        data = {
          github: { login, followers, public_repos, total_stars: totalStars },
          gitlab: { username },
          twitter: {
            username: twitterUsername,
            followers_count,
            total_likes: totalLikes,
            total_retweets: totalRetweets,
            total_replies: totalReplies,
          },
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
