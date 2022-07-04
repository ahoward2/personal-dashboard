import React from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

const Header = ({ headerData }) => {
  const { title } = headerData ?? {};
  return (
    <header className="flex w-screen items-center justify-between p-2 md:p-4">
      <div className="hidden md:block"></div>
      <h3 className="px-2 text-xl font-black text-sky-900 dark:text-teal-300 md:px-0 md:text-2xl">
        {title ? title : "..."}
      </h3>
      <ThemeToggler></ThemeToggler>
    </header>
  );
};

export default Header;
