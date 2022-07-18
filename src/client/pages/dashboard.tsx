import React from "react";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import { Clipper } from "../components/Clipper/Clipper";
import { useMatch } from "@tanstack/react-location";
import { TwitterChart } from "../components/TwitterChart/TwitterChart";
import { Message } from "../components/Message/Message";
import AccountCard from "../components/AccountCard/AccountCard";
import { LocationGenerics } from "../interfaces/location.interface";

const Dashboard = () => {
  const {
    data: { data, error },
    isLoading,
  } = useMatch<LocationGenerics>();

  const { timeline_items, ...restTwitter } = data?.twitter ?? {};

  const blockWidthStyle = () => {
    let style = ``;
    if (data && Object.entries(data)?.length === 1) {
      style = `md:w-full`;
    } else if (data && Object.entries(data)?.length === 2) {
      style = `md:w-1/2`;
    } else {
      style = `md:w-1/3`;
    }
    return style;
  };

  return (
    <div className="bg-white dark:bg-black">
      {!isLoading && data && (
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
                    <AccountCard
                      data={{ ...{ Account: "Github" }, ...data?.github }}
                    ></AccountCard>
                  </div>
                )}
                {data?.gitlab && (
                  <div className={`mb-4 md:m-2 ${blockWidthStyle()}`}>
                    <AccountCard
                      data={{ ...{ Account: "Gitlab" }, ...data?.gitlab }}
                    ></AccountCard>
                  </div>
                )}
                {data?.twitter && (
                  <div className={`mb-4 md:m-2 ${blockWidthStyle()}`}>
                    <AccountCard
                      data={{
                        ...{ Account: "Twitter" },
                        ...restTwitter,
                      }}
                    ></AccountCard>
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
      )}
      {!data && error?.response?.status === 429 && (
        <DashboardLayout
          header={
            <Header
              headerData={{
                title: "Dashboard Composer",
              }}
              clipper={<></>}
            ></Header>
          }
          mainPanel={
            <div className="w-screen px-4">
              <Message
                title="Error"
                content={`${error?.message}. You've sent too many requests to the server within the last minute.Try again in a minute and please be gentle with the server 😌.`}
              ></Message>
            </div>
          }
        ></DashboardLayout>
      )}
    </div>
  );
};

export default Dashboard;
