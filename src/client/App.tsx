import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Header from "./components/Header/Header";
import Github from "./components/GitHub/Github";
import Gitlab from "./components/Gitlab/Gitlab";
import { GlobalStyle } from "./App.styles";

const App = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios.get("api/details").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <HomeLayout
        header={<Header />}
        mainPanel={
          <>
            <Github githubData={data.github}></Github>
            <Gitlab gitlabData={data.gitlab}></Gitlab>
          </>
        }
      ></HomeLayout>
    </>
  );
};

export default App;
