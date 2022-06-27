import React from "react";

const HomeLayout = ({ header, mainPanel }) => {
  return (
    <>
      <div className="h-screen w-screen">
        <div>{header}</div>
        <div className="flex">
          <div className="">{mainPanel}</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
