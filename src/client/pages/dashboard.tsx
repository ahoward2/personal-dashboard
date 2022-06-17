// @ts-nocheck
import React from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import Github from "../components/GitHub/Github";
import Gitlab from "../components/Gitlab/Gitlab";
import { GlobalStyle } from "../App.styles";
import Twitter from "../components/Twitter/Twitter";
import { useSearch } from "@tanstack/react-location";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { github, gitlab, twitter } = useSearch();

  const { data, isLoading } = useQuery(
    ["details", github, gitlab, twitter],
    () => getDetails(github, gitlab, twitter),
    {
      staleTime: 10000 * 1000,
      enabled:
        github !== undefined && gitlab !== undefined && twitter !== undefined,
    }
  );

  async function getDetails(gh, gl, tw) {
    return await axios.get(
      `api/details?github=${gh}&gitlab=${gl}&twitter=${tw}`
    );
  }

  return (
    <>
      <GlobalStyle />
      {data && !isLoading ? (
        <DashboardLayout
          header={
            <Header
              headerData={{
                name: data?.data?.github?.login,
                bio: "Software Developer",
              }}
            />
          }
          mainPanel={
            <>
              <Github githubData={data.data.github}></Github>
              <Gitlab gitlabData={data.data.gitlab}></Gitlab>
              <Twitter twitterData={data.data.twitter}></Twitter>
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
