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
  } = useMatch();

  return (
    <>
      {github && gitlab && twitter ? (
        <DashboardLayout
          header={
            <Header
              headerData={{
                name: "Dashboard Composer",
                bio: "Your Search",
              }}
            />
          }
          mainPanel={
            <>
              {github && github?.empty === false && (
                <Github githubData={github}></Github>
              )}
              {gitlab && gitlab?.empty === false && (
                <Gitlab gitlabData={gitlab}></Gitlab>
              )}
              {twitter && twitter?.empty === false && (
                <Twitter twitterData={twitter}></Twitter>
              )}
            </>
          }
        ></DashboardLayout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
