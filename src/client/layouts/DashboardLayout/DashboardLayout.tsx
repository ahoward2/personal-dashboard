import React from "react";

const DashboardLayout = ({ header, mainPanel }) => {
  return (
    <>
      <div className="w-screen bg-black">
        <div>{header}</div>
        <div className="flex">
          <div className="">{mainPanel}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
