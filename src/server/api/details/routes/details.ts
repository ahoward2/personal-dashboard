import axios from "axios";
import { Request, Response } from "express";
import { Logger } from "@nestjs/common";

const logger = new Logger("DETAILS");

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
      return axios.get(`http://localhost:8080/api/github/${githubUsername}`);
    }

    async function getGitlabData(gitlabUsername) {
      return axios.get(`http://localhost:8080/api/gitlab/${gitlabUsername}`);
    }

    async function getTwitterData(twitterUsername) {
      return axios.get(`http://localhost:8080/api/twitter/${twitterUsername}`);
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
        } else {
          // Use placeholder promises to keep call array length
          // for indexing
          callArray.push(placeHolderPromise());
        }
        if (gitlab) {
          callArray.push(getGitlabData(gitlab));
        } else {
          callArray.push(placeHolderPromise());
        }
        if (twitter) {
          callArray.push(getTwitterData(twitter));
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
        logger.log("Promise finished");
        // ======= Construct Details Response ======= //
        const { github } = result[0]?.data ?? {};
        const { gitlab } = result[1]?.data ?? {};
        const { twitter } = result[2]?.data ?? {};

        // data = {
        //   github,
        //   gitlab: result[1],
        //   twitter: result[2],
        // };
        res.json({
          github,
          gitlab,
          twitter,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export const RouteConfig = {
  path: "/details",
  handler: handler,
};
