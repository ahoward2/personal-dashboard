import React from "react";

const Gitlab = ({ gitlabData }) => {
  const { username } = gitlabData ?? {};

  return (
    <div className="my-1 h-full w-full rounded border border-indigo-700 bg-white p-2 dark:border-teal-300 dark:bg-black md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-indigo-700 dark:text-teal-300">
            Account
          </p>
          <p className="text-right text-fuchsia-700 dark:text-rose-300">
            Gitlab
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-indigo-700 dark:text-teal-300">
            Username
          </p>
          <p className="text-right text-fuchsia-700 dark:text-rose-300">
            {username ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Gitlab;
