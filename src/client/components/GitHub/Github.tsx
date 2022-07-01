import React from "react";

const Github = ({ githubData }) => {
  const { login, followers, public_repos, total_stars } = githubData ?? {};

  return (
    <div className="my-2 w-screen border border-green-700 bg-white p-2 dark:border-green-500 dark:bg-black md:mx-4 md:my-4 md:w-1/3 md:p-4">
      <ul>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Account
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            Github
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Username
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {login ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Followers
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {followers ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Public Repos
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {public_repos ?? "loading..."}
          </p>
        </li>
        <li className="flex justify-between">
          <p className="text-left text-green-700 dark:text-green-500">
            Total Stars
          </p>
          <p className="text-right text-cyan-700 dark:text-yellow-300">
            {total_stars ?? "loading..."}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Github;
