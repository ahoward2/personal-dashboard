import React from "react";
import TwitterWrapper from "./Twitter.styles";

const Twitter = ({ twitterData }) => {
  const { username, followers_count } = twitterData ?? {};

  return (
    <TwitterWrapper>
      <div className="twitter-block">
        <p className="row-title">Twitter</p>
        <p className="column-element">{username ?? "..."}</p>
        <p className="column-element">
          {followers_count + " followers" ?? "..."}
        </p>
      </div>
    </TwitterWrapper>
  );
};

export default Twitter;
