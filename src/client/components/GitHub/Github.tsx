import React from "react";
import GithubWrapper from "./Github.styles";

type GithubProps = {
  userName: string;
  avatarUrl: string;
};

const Github = ({ userName, avatarUrl }: GithubProps) => {
  return (
    <GithubWrapper>
      <div className="github-block">
        <p>Github</p>
        <p>{userName ?? "Username unavailable"}</p>
        <img width={"30px"} height={"30px"} src={avatarUrl} alt="github" />
      </div>
    </GithubWrapper>
  );
};

export default Github;
