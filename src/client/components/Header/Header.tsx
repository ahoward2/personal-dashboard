import React from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

const Header = ({ headerData }) => {
  const { name, bio } = headerData ?? {};
  return (
    <header className="flex items-center px-4 py-4">
      <h3 className="text-xl text-green-700 dark:text-green-500 md:text-2xl">
        {name ? name : "..."}
      </h3>
      <h6 className="ml-4 text-sm text-green-700 dark:text-green-500">
        {bio ? bio : "..."}
      </h6>
      <ThemeToggler></ThemeToggler>
    </header>
  );
};

export default Header;
