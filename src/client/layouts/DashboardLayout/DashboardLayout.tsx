import React from "react";

const DashboardLayout = ({ header, mainPanel }) => {
  return (
    <>
      <div className="h-screen w-screen">
        <div>{header}</div>
        <div className="flex">
          <div>{mainPanel}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
