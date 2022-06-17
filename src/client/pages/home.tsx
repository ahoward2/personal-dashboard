import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <>
      <HomeLayout
        header={
          <Header
            headerData={{ name: "Austin Howard", bio: "Software Developer" }}
          />
        }
        mainPanel={
          <>
            <div>home page</div>
          </>
        }
      ></HomeLayout>
    </>
  );
};

export default Home;
