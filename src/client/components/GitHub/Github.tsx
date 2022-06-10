import React from "react";
import GithubWrapper from "./Github.styles";

const Github = ({ githubData }) => {
  const { login, followers, public_repos } = githubData ?? {};

  return (
    <GithubWrapper>
      <div className="github-block">
        <p className="row-title">github</p>
        <p className="column-element">{login ?? "Username unavailable"}</p>
        <p className="column-element">
          {followers + " followers" ?? "Followers unavailable"}
        </p>
        <p className="column-element">
          {public_repos + " repos" ?? "Followers unavailable"}
        </p>
      </div>
    </GithubWrapper>
  );
};

export default Github;
