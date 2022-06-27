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
    <div className="my-4 flex px-2">
      <p className="ml-2 text-green-700 dark:text-green-500">twitter</p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {username ?? "..."}
      </p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {followers_count + " followers" ?? "..."}
      </p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {total_likes + " likes" ?? "..."}
      </p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {total_retweets + " retweets" ?? "..."}
      </p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {total_replies + " replies" ?? "..."}
      </p>
    </div>
  );
};

export default Twitter;
