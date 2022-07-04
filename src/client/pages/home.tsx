import React from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Header from "../components/Header/Header";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { Message } from "../components/Message/Message";

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
              <h1 className=" text-center text-3xl font-black text-fuchsia-700 dark:text-rose-300 md:text-6xl">
                Search Your Accounts
              </h1>
            </div>
            <SearchForm></SearchForm>
            <div className="mx-auto w-full px-4 md:w-1/2 md:pt-10">
              <Message
                title={"Important ‼️"}
                content={
                  "We do not use or save any of your personal information. Data is temporarily cached purely for the sake of performance."
                }
              ></Message>
            </div>
          </div>
        }
      ></HomeLayout>
    </div>
  );
};

export default Home;
