import React from "react";

const Gitlab = ({ gitlabData }) => {
  const { username } = gitlabData ?? {};

  return (
    <div className="my-4 flex px-2">
      <p className="ml-2 text-green-700 dark:text-green-500">gitlab</p>
      <p className="mx-2 text-cyan-700 dark:text-yellow-300">
        {username ?? "..."}
      </p>
    </div>
  );
};

export default Gitlab;
