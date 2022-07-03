import React from "react";

const Twitter = ({ twitterData }) => {
  const {
    username,
    followers_count,
    total_likes,
    total_retweets,
    total_replies,
  } = twitterData ?? {};

  return (
    <div className="my-1 h-full w-full border border-green-700 bg-white p-2 dark:border-green-500 dark:bg-black md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Account
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            Twitter
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Username
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {username ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Followers
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {followers_count ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Total Likes
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {total_likes ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Total Retweets
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {total_retweets ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Total Repies
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {total_replies ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Twitter;
