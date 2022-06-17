import React from "react";
import DashboardWrapper from "./DashboardLayout.styles";
import { GlobalStyle } from "../../App.styles";

const DashboardLayout = ({ header, mainPanel }) => {
  return (
    <>
      <GlobalStyle />
      <DashboardWrapper>
        <div className="home-layout">
          <div>{header}</div>
          <div className="main-content">
            <div className="main-panel">{mainPanel}</div>
          </div>
        </div>
      </DashboardWrapper>
    </>
  );
};

export default DashboardLayout;
