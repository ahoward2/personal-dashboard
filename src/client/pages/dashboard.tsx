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
import { Message } from "../components/Message/Message";

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
              clipper={<Clipper></Clipper>}
            />
          }
          mainPanel={
            <div className="w-screen px-4">
              <div className="flex w-full flex-col justify-between md:flex-row">
                {data?.github && (
                  <div className={`my-4 md:m-2 ${blockWidthStyle()}`}>
                    <Github githubData={data?.github}></Github>
                  </div>
                )}
                {data?.gitlab && (
                  <div className={`mb-4 md:m-2 ${blockWidthStyle()}`}>
                    <Gitlab gitlabData={data?.gitlab}></Gitlab>
                  </div>
                )}
                {data?.twitter && (
                  <div className={`mb-4 md:m-2 ${blockWidthStyle()}`}>
                    <Twitter twitterData={data?.twitter}></Twitter>
                  </div>
                )}
              </div>
              {data?.twitter && (
                <>
                  <div className="hidden md:mt-4 md:block">
                    <TwitterChart
                      data={data?.twitter?.timeline_items}
                    ></TwitterChart>
                  </div>
                  <div className="md:hidden">
                    <Message
                      title="Try Desktop Version ⚡️"
                      content="To see past 30 tweets stats chart and for better overall experience, consider viewing the dashboard on a desktop or medium device."
                    ></Message>
                  </div>
                </>
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
