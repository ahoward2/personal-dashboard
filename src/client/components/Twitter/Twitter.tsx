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
    <div className="my-1 h-full w-full border border-sky-900 bg-white p-2 dark:border-teal-300 dark:bg-black md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Account</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            Twitter
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Username</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {username ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Followers</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {followers_count ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">
            P90 Tweet Likes
          </p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {total_likes ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">
            P90 Tweet Retweets
          </p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {total_retweets ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">
            P90 Tweet Replies
          </p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {total_replies ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Twitter;
