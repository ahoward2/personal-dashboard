import React from "react";

const Github = ({ githubData }) => {
  const { login, followers, public_repos, total_stars } = githubData ?? {};

  return (
    <div className="my-4 flex px-2">
      <p className="ml-2 text-green-500">github</p>
      <p className="mx-2 text-yellow-300">{login ?? "..."}</p>
      <p className="mx-2 text-yellow-300">
        {followers + " followers" ?? "..."}
      </p>
      <p className="mx-2 text-yellow-300">{public_repos + " repos" ?? "..."}</p>
      <p className="mx-2 text-yellow-300">{total_stars + " stars" ?? "..."}</p>
    </div>
  );
};

export default Github;
