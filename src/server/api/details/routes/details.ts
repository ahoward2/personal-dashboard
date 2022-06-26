import axios from "axios";
import { Request, Response } from "express";
import { Logger } from "@nestjs/common";
require("dotenv").config();

// Create new NestJS logger
const logger = new Logger("DETAIL_ROUTE");

export type CacheObject = {
  key: any;
  ttl: number;
  startTime: number;
  cacheSetOnce: boolean;
  data: Object;
};

const cache: CacheObject[] = [];

/**
 * Cache adapter to use handler function in.
 * Must have reference to a cache array.
 * @param req Express request.
 * @param res Express response.
 */
async function useCache(req: Request, res: Response) {
  let targetCacheObject;

  if (
    cache.length === 0 ||
    cache.find((cacheobj) => cacheobj.key === req.url) === undefined
  ) {
    targetCacheObject = {
      key: req.url,
      // Seconds (1/2 day).
      ttl: 43200,
      // Should be refreshed every time the cache entry is set.
      startTime: Date.now(),
      // Boolean for first time cache is set.
      cacheSetOnce: false,
      // Data object for the cached values and their keys.
      data: {},
    };
    logger.log(`Pushing new cache object: ${targetCacheObject.key}`);
    cache.push(targetCacheObject);
  } else {
    targetCacheObject = cache.find((cacheobj) => cacheobj.key === req.url);
  }
  const timePassed = Date.now() - targetCacheObject.startTime;
  if (
    Math.floor(timePassed / 1000) >= targetCacheObject.ttl ||
    targetCacheObject.cacheSetOnce === false
  ) {
    logger.log(`Set value to cache: ${targetCacheObject.key}`);
    const data = await handler(req, res);
    targetCacheObject.data = data;
    targetCacheObject.startTime = Date.now();
    targetCacheObject.cacheSetOnce = true;
  } else {
    logger.log(`Value pulled from cache: ${targetCacheObject.key}`);
  }
  res.json(targetCacheObject.data);
}

/**
 * Aggregates fetches from multiple API endpoints about
 * a user's details.
 *
 * @param req Express request.
 * @param res Express response.
 */
async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    const { github, gitlab, twitter } = req.query ?? {
      github: "ahoward2",
      gitlab: "ahoward21",
      twitter: "ahoward_8",
    };
    // Make Concurrent API calls
    let data = {};

    async function getGithubData(githubUsername) {
      return axios.get(`https://api.github.com/users/${githubUsername}`);
    }

    async function getRepos(githubUsername) {
      return axios.get(`https://api.github.com/users/${githubUsername}/repos`);
    }

    async function getGitlabData(gitlabUsername) {
      return axios.get(
        `https://gitlab.com/api/v4/users?username=${gitlabUsername}`
      );
    }

    async function getTwitterData(twitterUserName) {
      return axios.get(
        `https://api.twitter.com/2/users/by/username/${twitterUserName}?user.fields=public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
    }

    async function getTweetsTimeline(twitterId) {
      return axios.get(
        `https://api.twitter.com/2/users/${twitterId}/tweets?exclude=retweets,replies&tweet.fields=public_metrics&max_results=91`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      );
    }

    async function getAllTwitterData(twitterUsername) {
      let data;
      try {
        const twitterDataRes = await getTwitterData(twitterUsername);
        const twitterTimelineRes = await getTweetsTimeline(
          twitterDataRes.data.data.id
        );
        data = {
          normalData: twitterDataRes.data,
          timelineData: twitterTimelineRes.data,
        };
      } catch (error) {
        console.error(error);
      }

      return data;
    }

    /**
     * A function to construct an array of calls
     * for Promise.all or Promise.allSettled. If user only provides
     * some of the account options and not all we need to construct an array
     * that supports any number of accounts.
     */
    async function constructCallArray({
      github,
      gitlab,
      twitter,
    }: {
      github?: any;
      gitlab?: any;
      twitter?: any;
    }) {
      const callArray: Promise<any>[] = [];
      try {
        if (github) {
          callArray.push(getGithubData(github));
          callArray.push(getRepos(github));
        } else {
          // Use placeholder promises to keep call array length
          // for indexing
          callArray.push(placeHolderPromise());
          callArray.push(placeHolderPromise());
        }
        if (gitlab) {
          callArray.push(getGitlabData(gitlab));
        } else {
          callArray.push(placeHolderPromise());
        }
        if (twitter) {
          callArray.push(getAllTwitterData(twitter));
        } else {
          callArray.push(placeHolderPromise());
        }
      } catch (error) {
        console.error(error);
      }
      return callArray;
    }

    async function placeHolderPromise() {
      return { empty: true };
    }

    const callArray = await constructCallArray({ github, gitlab, twitter });

    await Promise.all(callArray)
      .then((result) => {
        // ======= Construct Github Response ======= //
        const { login, followers, public_repos } = result[0]?.data ?? {};
        let githubResObject = { login, followers, public_repos };

        if (result[1]?.empty) {
          githubResObject["empty"] = true;
        } else {
          let totalStars = 0;
          result[1]?.data?.forEach((repo) => {
            totalStars += repo?.stargazers_count ?? 0;
          });
          githubResObject["total_stars"] = totalStars;
          githubResObject["empty"] = false;
        }

        // ======= Construct Gitlab Response ======= //
        const { username } = result[2]?.data?.[0] ?? {};
        let gitlabResObject = { username };

        if (result[2]?.empty) {
          gitlabResObject["empty"] = true;
        } else {
          gitlabResObject["empty"] = false;
        }

        // ======= Construct Twitter Response ======= //
        const { followers_count } =
          result[3]?.normalData?.data?.public_metrics ?? {};

        const { username: twitterUsername } = result[3]?.normalData?.data ?? {};

        let twitterResObject = { username: twitterUsername, followers_count };

        if (result[3]?.empty) {
          twitterResObject["empty"] = true;
        } else {
          let totalLikes = 0;
          let totalRetweets = 0;
          let totalReplies = 0;

          result[3]?.timelineData?.data?.forEach((tweet) => {
            totalLikes += tweet?.public_metrics?.like_count ?? 0;
            totalRetweets += tweet?.public_metrics?.retweet_count ?? 0;
            totalReplies += tweet?.public_metrics?.replie_count ?? 0;
          });
          twitterResObject["total_likes"] = totalLikes;
          twitterResObject["total_retweets"] = totalRetweets;
          twitterResObject["total_replies"] = totalReplies;
          twitterResObject["empty"] = false;
        }

        data = {
          github: githubResObject,
          gitlab: gitlabResObject,
          twitter: twitterResObject,
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
