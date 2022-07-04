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
          <div className="flex w-screen flex-col">
            <div className="p-2 md:p-4">
              <h1 className=" text-center text-3xl font-black text-purple-800 dark:text-rose-300 md:text-6xl">
                Search Your Accounts
              </h1>
            </div>
            <SearchForm></SearchForm>
          </div>
        }
      ></HomeLayout>
    </div>
  );
};

export default Home;
