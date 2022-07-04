import axios from "axios";
import { Request, Response } from "express";

/**
 * Aggregates fetches from multiple API endpoints about
 * a user's details.
 *
 * @param req Express request.
 * @param res Express response.
 */
async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    const { username } = req.params ?? {
      username: "ahoward2",
    };
    // Make Concurrent API calls
    let data = {};

    async function getGithubData(githubUsername) {
      return axios.get(`https://api.github.com/users/${githubUsername}`);
    }

    async function getRepos(githubUsername) {
      return axios.get(`https://api.github.com/users/${githubUsername}/repos`);
    }

    /**
     * A function to construct an array of calls
     * for Promise.all or Promise.allSettled. If user only provides
     * some of the account options and not all we need to construct an array
     * that supports any number of accounts.
     */
    async function constructCallArray({ username }: { username?: any }) {
      const callArray: Promise<any>[] = [];
      try {
        if (username) {
          callArray.push(getGithubData(username));
          callArray.push(getRepos(username));
        }
      } catch (error) {
        console.error(error);
      }
      return callArray;
    }

    const callArray = await constructCallArray({ username });

    await Promise.all(callArray)
      .then((result) => {
        // ======= Construct Github Response ======= //
        const { login, followers, public_repos } = result[0]?.data ?? {};
        let githubResObject = { login, followers, public_repos };

        if (result[0] === undefined || result[1] === undefined) {
          return;
        } else {
          let totalStars = 0;
          result[1]?.data?.forEach((repo) => {
            totalStars += repo?.stargazers_count ?? 0;
          });
          githubResObject["total_stars"] = totalStars;
        }

        data = {
          github: githubResObject,
        };
      })
      .catch((error) => {
        console.error(error);
      });
    return data;
  }
}

export const RouteConfig = {
  path: "/github/:username",
  handler: handler,
};
