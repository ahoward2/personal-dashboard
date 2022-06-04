import React from "react";
import HomeLayoutWrapper from "./HomeLayout.styles";
const HomeLayout = ({ header, leftChild, middleChild, rightChild }) => {
  return (
    <HomeLayoutWrapper>
      <div className="home-layout">
        <div className="header">{header}</div>
        <div className="main-content">
          <div className="home-layout-left">{leftChild}</div>
          <div className="home-layout-middle">{middleChild}</div>
          <div className="home-layout-right">{rightChild}</div>
        </div>
      </div>
    </HomeLayoutWrapper>
  );
};

export default HomeLayout;
