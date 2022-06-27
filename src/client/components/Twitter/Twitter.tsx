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
    <div className="flex px-2 my-4">
      <p className="text-green-500 ml-2">twitter</p>
      <p className="text-yellow-300 mx-2">{username ?? "..."}</p>
      <p className="text-yellow-300 mx-2">
        {followers_count + " followers" ?? "..."}
      </p>
      <p className="text-yellow-300 mx-2">{total_likes + " likes" ?? "..."}</p>
      <p className="text-yellow-300 mx-2">
        {total_retweets + " retweets" ?? "..."}
      </p>
      <p className="text-yellow-300 mx-2">
        {total_replies + " replies" ?? "..."}
      </p>
    </div>
  );
};

export default Twitter;
