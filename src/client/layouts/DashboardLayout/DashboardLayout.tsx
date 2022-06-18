import React from "react";
import DashboardWrapper from "./DashboardLayout.styles";

const DashboardLayout = ({ header, mainPanel }) => {
  return (
    <>
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
