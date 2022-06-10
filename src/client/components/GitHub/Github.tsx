import React from "react";
import GithubWrapper from "./Github.styles";

const Github = ({ githubData }) => {
  const { login, followers, public_repos, total_stars } = githubData ?? {};

  return (
    <GithubWrapper>
      <div className="github-block">
        <p className="row-title">github</p>
        <p className="column-element">{login ?? "..."}</p>
        <p className="column-element">{followers + " followers" ?? "..."}</p>
        <p className="column-element">{public_repos + " repos" ?? "..."}</p>
        <p className="column-element">{total_stars + " stars" ?? "..."}</p>
      </div>
    </GithubWrapper>
  );
};

export default Github;
