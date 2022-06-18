import React from "react";
import HomeLayoutWrapper from "./HomeLayout.styles";

const HomeLayout = ({ header, mainPanel }) => {
  return (
    <>
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
