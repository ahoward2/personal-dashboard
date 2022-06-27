import React from "react";

const HomeLayout = ({ header, mainPanel }) => {
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

export default HomeLayout;
