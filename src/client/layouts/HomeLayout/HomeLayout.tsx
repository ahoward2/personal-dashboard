import React from "react";
import HomeLayoutWrapper from "./HomeLayout.styles";
import { GlobalStyle } from "../../App.styles";

const HomeLayout = ({ header, mainPanel }) => {
  return (
    <>
      <GlobalStyle />
      <HomeLayoutWrapper>
        <div className="home-layout">
          <div>{header}</div>
          <div className="main-content">
            <div className="main-panel">{mainPanel}</div>
          </div>
        </div>
      </HomeLayoutWrapper>
    </>
  );
};

export default HomeLayout;
