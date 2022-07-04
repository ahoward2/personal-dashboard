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
      username: "ahoward21",
    };
    // Make Concurrent API calls
    let data = {};

    async function getGitlabData(gitlabUsername) {
      return axios.get(
        `https://gitlab.com/api/v4/users?username=${gitlabUsername}`
      );
    }

    async function getGitlabDetails(gitlabUserId) {
      return axios.get(`https://gitlab.com/api/v4/users/${gitlabUserId}`, {
        headers: {
          "PRIVATE-TOKEN": `${process.env.GITLAB_ACCESS_TOKEN}`,
        },
      });
    }

    async function getGitlabRepos(gitlabUserId) {
      return axios.get(
        `https://gitlab.com/api/v4/users/${gitlabUserId}/projects`
      );
    }

    async function getAllGitlabData(gitlabUsername) {
      let data;
      try {
        const gitlabDataRes = await getGitlabData(gitlabUsername);
        const gitlabReposRes = await getGitlabRepos(gitlabDataRes?.data[0]?.id);
        const gitlabDetailRes = await getGitlabDetails(
          gitlabDataRes?.data[0]?.id
        );
        data = {
          details: gitlabDetailRes.data,
          repos: gitlabReposRes.data,
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
    async function constructCallArray({ username }: { username?: any }) {
      const callArray: Promise<any>[] = [];
      try {
        if (username) {
          callArray.push(getAllGitlabData(username));
        }
      } catch (error) {
        console.error(error);
      }
      return callArray;
    }

    const callArray = await constructCallArray({ username });

    await Promise.all(callArray)
      .then((result) => {
        // ======= Construct Gitlab Response ======= //
        const { username, followers } = result[0]?.details ?? {};

        if (username === undefined) {
          return;
        }

        console.log(result[0]);

        let totalStars = 0;

        result[0]?.repos?.map((repo) => {
          totalStars += repo.star_count;
        });

        let gitlabResObject = {
          username,
          followers,
          public_repos: result[0]?.repos?.length,
          total_stars: totalStars,
        };

        data = {
          gitlab: gitlabResObject,
        };
      })
      .catch((error) => {
        console.error(error);
      });
    return data;
  }
}

export const RouteConfig = {
  path: "/gitlab/:username",
  handler: handler,
};
