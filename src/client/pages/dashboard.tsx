// @ts-nocheck
import React from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import Github from "../components/GitHub/Github";
import Gitlab from "../components/Gitlab/Gitlab";
import Twitter from "../components/Twitter/Twitter";
import { Clipper } from "../components/Clipper/Clipper";
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
            <div className="w-screen px-2 md:px-0">
              <div className="flex w-full flex-col justify-between md:flex-row">
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
              <div className="flex py-1 md:px-4">
                <Clipper></Clipper>
              </div>
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
