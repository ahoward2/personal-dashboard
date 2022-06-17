import React from "react";
import HeaderWrapper from "./Header.styles";

const Header = ({ headerData }) => {
  const { name, bio } = headerData ?? {};
  return (
    <HeaderWrapper>
      <header className="header">
        <h3>{name ? name : "..."}</h3>
        <h6>{bio ? bio : "..."}</h6>
      </header>
    </HeaderWrapper>
  );
};

export default Header;
