import React, { useState } from "react";
import SearchFormWrapper from "./SearchForm.styles";
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
    <SearchFormWrapper>
      <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="column">
          <label className="label">Github</label>
          <input
            type="text"
            name="github"
            onChange={(e) => setGithub(e.target.value)}
          ></input>
        </div>
        <div className="column">
          <label className="label">Gitlab</label>
          <input
            type="text"
            name="gitlab"
            onChange={(e) => setGitlab(e.target.value)}
          ></input>
        </div>
        <div className="column">
          <label className="label">Twitter</label>
          <input
            type="text"
            name="twitter"
            onChange={(e) => setTwitter(e.target.value)}
          ></input>
        </div>
        <button type="submit">Search</button>
      </form>
    </SearchFormWrapper>
  );
};

export { SearchForm };
