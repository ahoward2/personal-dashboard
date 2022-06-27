import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-location";

const SearchForm = () => {
  // Use React Form Instead
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [twitter, setTwitter] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let navigateString = `/dashboard`;

    if (github !== "") {
      navigateString += `?github=${github}`;
    }

    if (gitlab !== "") {
      navigateString += `&gitlab=${gitlab}`;
    }

    if (twitter !== "") {
      navigateString += `&twitter=${twitter}`;
    }

    e.preventDefault();
    navigate({
      to: navigateString,
    });
  };

  return (
    <form
      className="flex w-screen flex-col p-2 md:flex-row"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col px-2">
        <label className="text-green-500">Github</label>
        <input
          type="text"
          name="github"
          className="border-1 appearance-none border border-green-500 bg-black text-green-500 focus:border-green-500"
          onChange={(e) => setGithub(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col px-2">
        <label className="text-green-500">Gitlab</label>
        <input
          type="text"
          name="gitlab"
          className="border-1 appearance-none border border-green-500 bg-black text-green-500 focus:border-green-500"
          onChange={(e) => setGitlab(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col px-2">
        <label className="text-green-500">Twitter</label>
        <input
          type="text"
          name="twitter"
          className="border-1 appearance-none border border-green-500 bg-black text-green-500 focus:border-green-500"
          onChange={(e) => setTwitter(e.target.value)}
        ></input>
      </div>
      <button
        type="submit"
        className="border-1 mx-2 mt-4 border border-green-500 bg-black px-4 py-2 text-green-500 md:mt-0 md:ml-2 md:self-end"
      >
        Search
      </button>
    </form>
  );
};

export { SearchForm };
