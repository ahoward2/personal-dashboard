import React from "react";
import TwitterWrapper from "./Twitter.styles";

const Twitter = ({ twitterData }) => {
  const {
    username,
    followers_count,
    total_likes,
    total_retweets,
    total_replies,
  } = twitterData ?? {};

  return (
    <TwitterWrapper>
      <div className="twitter-block">
        <p className="row-title">twitter</p>
        <p className="column-element">{username ?? "..."}</p>
        <p className="column-element">
          {followers_count + " followers" ?? "..."}
        </p>
        <p className="column-element">{total_likes + " likes" ?? "..."}</p>
        <p className="column-element">
          {total_retweets + " retweets" ?? "..."}
        </p>
        <p className="column-element">{total_replies + " replies" ?? "..."}</p>
      </div>
    </TwitterWrapper>
  );
};

export default Twitter;
