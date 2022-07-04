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
          callArray.push(getGitlabData(username));
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
        const { username } = result[0]?.data?.[0] ?? {};
        let gitlabResObject = { username };

        if (username === undefined) {
          return;
        }

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
