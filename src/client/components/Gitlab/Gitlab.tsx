import React from "react";

const Gitlab = ({ gitlabData }) => {
  const { username } = gitlabData ?? {};

  return (
    <div className="my-2 w-screen border border-green-700 bg-white p-2 dark:border-green-500 dark:bg-black md:mx-4 md:my-4 md:w-1/3 md:p-4">
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
