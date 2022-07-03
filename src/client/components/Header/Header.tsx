import React from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

const Header = ({ headerData }) => {
  const { title } = headerData ?? {};
  return (
    <header className="flex w-screen items-center justify-between p-2 md:p-4">
      <h3 className="text-xl text-green-700 dark:text-green-500 md:text-2xl">
        {title ? title : "..."}
      </h3>
      <ThemeToggler></ThemeToggler>
    </header>
  );
};

export default Header;
