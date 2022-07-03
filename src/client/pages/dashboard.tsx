// @ts-nocheck
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import Github from "../components/GitHub/Github";
import Gitlab from "../components/Gitlab/Gitlab";
import Twitter from "../components/Twitter/Twitter";
import { Clipper } from "../components/Clipper/Clipper";
import { useMatch } from "@tanstack/react-location";
import { TwitterChart } from "../components/Twitter/TwitterChart";

const Dashboard = () => {
  const {
    data: { data },
    isLoading,
  } = useMatch();

  const blockWidthStyle = () => {
    let style = ``;
    if (Object.entries(data)?.length === 1) {
      style = `md:w-full`;
    } else if (Object.entries(data)?.length === 2) {
      style = `md:w-1/2`;
    } else {
      style = `md:w-1/3`;
    }
    return style;
  };

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
            <div className="w-screen px-2">
              <div className="flex w-full flex-col justify-between pb-1 md:flex-row">
                {data?.github && data?.github?.empty === false && (
                  <div className={`md:m-2 ${blockWidthStyle()}`}>
                    <Github githubData={data?.github}></Github>
                  </div>
                )}
                {data?.gitlab && data?.gitlab?.empty === false && (
                  <div className={`md:m-2 ${blockWidthStyle()}`}>
                    <Gitlab gitlabData={data?.gitlab}></Gitlab>
                  </div>
                )}
                {data?.twitter && data?.twitter?.empty === false && (
                  <div className={`md:m-2 ${blockWidthStyle()}`}>
                    <Twitter twitterData={data?.twitter}></Twitter>
                  </div>
                )}
              </div>
              {data?.twitter && data?.twitter?.empty === false && (
                <div className="sm:hidden md:block">
                  <TwitterChart
                    data={data?.twitter?.timeline_items}
                  ></TwitterChart>
                </div>
              )}
              <div className="flex py-1 md:py-2 md:px-2">
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
