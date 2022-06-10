import React from "react";
import GitlabWrapper from "./Gitlab.styles";

const Gitlab = ({ gitlabData }) => {
  const { username } = gitlabData?.[0] ?? {};

  return (
    <GitlabWrapper>
      <div className="gitlab-block">
        <p className="row-title">gitlab</p>
        <p className="column-element">{username ?? "Username unavailable"}</p>
      </div>
    </GitlabWrapper>
  );
};

export default Gitlab;
