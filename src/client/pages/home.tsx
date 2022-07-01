import React from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Header from "../components/Header/Header";
import { SearchForm } from "../components/SearchForm/SearchForm";

const Home = () => {
  return (
    <div className="bg-white dark:bg-black">
      <HomeLayout
        header={
          <Header
            headerData={{
              title: "Dashboard Composer",
            }}
          />
        }
        mainPanel={
          <>
            <SearchForm></SearchForm>
          </>
        }
      ></HomeLayout>
    </div>
  );
};

export default Home;
