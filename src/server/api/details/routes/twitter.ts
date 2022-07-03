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
      username: "ahoward_8",
    };
    // Make Concurrent API calls
    let data = {};

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
        `https://api.twitter.com/2/users/${twitterId}/tweets?exclude=retweets,replies&tweet.fields=public_metrics&max_results=90`,
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
    async function constructCallArray({ username }: { username?: any }) {
      const callArray: Promise<any>[] = [];
      try {
        if (username) {
          callArray.push(getAllTwitterData(username));
        }
      } catch (error) {
        console.error(error);
      }
      return callArray;
    }

    const callArray = await constructCallArray({ username });

    await Promise.all(callArray)
      .then((result) => {
        // ======= Construct Twitter Response ======= //
        const { followers_count } =
          result[0]?.normalData?.data?.public_metrics ?? {};

        const { username: twitterUsername } = result[0]?.normalData?.data ?? {};

        let twitterResObject = { username: twitterUsername, followers_count };

        if (result[0]?.empty) {
          twitterResObject["empty"] = true;
        } else {
          let totalLikes = 0;
          let totalRetweets = 0;
          let totalReplies = 0;

          result[0]?.timelineData?.data?.forEach((tweet) => {
            totalLikes += tweet?.public_metrics?.like_count ?? 0;
            totalRetweets += tweet?.public_metrics?.retweet_count ?? 0;
            totalReplies += tweet?.public_metrics?.replie_count ?? 0;
          });
          twitterResObject["total_likes"] = totalLikes;
          twitterResObject["total_retweets"] = totalRetweets;
          twitterResObject["total_replies"] = totalReplies;
          twitterResObject["timeline_items"] = result[0]?.timelineData?.data
            ?.reverse()
            ?.slice(60, 90);
          twitterResObject["empty"] = false;
        }

        data = {
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
  path: "/twitter/:username",
  handler: handler,
};
