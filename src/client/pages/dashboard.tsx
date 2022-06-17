// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Header from "../components/Header/Header";
import Github from "../components/GitHub/Github";
import Gitlab from "../components/Gitlab/Gitlab";
import { GlobalStyle } from "../App.styles";
import Twitter from "../components/Twitter/Twitter";
import { useSearch } from "@tanstack/react-location";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { github, gitlab, twitter } = useSearch();

  useEffect(() => {
    async function getDetails() {
      await axios
        .get(`api/details?github=${github}&gitlab=${gitlab}&twitter=${twitter}`)
        .then((res) => {
          setData(res.data);
        });
    }
    if (github && gitlab && twitter) {
      getDetails();
    }
  }, [github, gitlab, twitter]);

  console.log(github, gitlab, twitter);
  console.log(data);

  return (
    <>
      <GlobalStyle />
      <DashboardLayout
        header={
          <Header
            headerData={{ name: "Austin Howard", bio: "Software Developer" }}
          />
        }
        mainPanel={
          <>
            <Github githubData={data.github}></Github>
            <Gitlab gitlabData={data.gitlab}></Gitlab>
            <Twitter twitterData={data.twitter}></Twitter>
          </>
        }
      ></DashboardLayout>
    </>
  );
};

export default Dashboard;
