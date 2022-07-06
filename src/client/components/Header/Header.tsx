import React from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

type HeaderProps = {
  headerData: any;
  clipper?: React.ReactNode;
};

const Header = ({ headerData, clipper }: HeaderProps) => {
  const { title } = headerData ?? {};
  return (
    <header className="flex w-screen items-center justify-between p-4 md:justify-center md:px-4 md:py-6">
      <h3 className="text-xl font-black text-fuchsia-700 dark:text-teal-300 md:px-0 md:text-2xl">
        {title ? title : "..."}
      </h3>
      <div className="md:px-4">
        {clipper && clipper}
        <ThemeToggler></ThemeToggler>
      </div>
    </header>
  );
};

export default Header;
