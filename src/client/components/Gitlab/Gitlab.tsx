import React from "react";

const Gitlab = ({ gitlabData }) => {
  const { username } = gitlabData ?? {};

  return (
    <div className="my-1 h-full w-full border border-green-700 bg-white p-2 dark:border-green-500 dark:bg-black md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Account
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            Gitlab
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Username
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {username ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Gitlab;
