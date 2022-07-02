// @ts-nocheck
import React from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import Github from "../components/GitHub/Github";
import Gitlab from "../components/Gitlab/Gitlab";
import Twitter from "../components/Twitter/Twitter";
import { useMatch } from "@tanstack/react-location";

const Dashboard = () => {
  const {
    data: {
      data: { github, gitlab, twitter },
    },
    isLoading,
  } = useMatch();

  return (
    <div className="bg-white dark:bg-black">
      {!isLoading ? (
        <DashboardLayout
          header={
            <Header
              headerData={{
                title: "Dashboard Composer",
              }}
            />
          }
          mainPanel={
            <div className="flex w-screen flex-col justify-between md:flex-row">
              {github && github?.empty === false && (
                <Github githubData={github}></Github>
              )}
              {gitlab && gitlab?.empty === false && (
                <Gitlab gitlabData={gitlab}></Gitlab>
              )}
              {twitter && twitter?.empty === false && (
                <Twitter twitterData={twitter}></Twitter>
              )}
            </div>
          }
        ></DashboardLayout>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
