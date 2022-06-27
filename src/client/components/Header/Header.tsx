import React from "react";

const Header = ({ headerData }) => {
  const { name, bio } = headerData ?? {};
  return (
    <header className="flex items-center px-4 py-4">
      <h3 className="text-xl text-green-500 md:text-2xl">
        {name ? name : "..."}
      </h3>
      <h6 className="ml-4 text-sm text-green-500">{bio ? bio : "..."}</h6>
    </header>
  );
};

export default Header;
