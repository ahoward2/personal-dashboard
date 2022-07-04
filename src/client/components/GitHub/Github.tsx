import React from "react";

const Github = ({ githubData }) => {
  const { login, followers, public_repos, total_stars } = githubData ?? {};

  return (
    <div className="my-1 h-full w-full border border-sky-900 bg-white p-2 dark:border-teal-300 dark:bg-black md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Account</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            Github
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Username</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {login ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">Followers</p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {followers ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">
            Public Repos
          </p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {public_repos ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-sky-900 dark:text-teal-300">
            Total Stars
          </p>
          <p className="text-right text-purple-800 dark:text-rose-300">
            {total_stars ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Github;
