import React from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Header from "../components/Header/Header";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { Message } from "../components/Message/Message";
import { Toast } from "../components/Toast/Toast";

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
              <h1 className="text-8xl bg-gradient-to-r from-fuchsia-700 to-indigo-700 bg-clip-text text-center text-3xl font-black text-transparent dark:from-teal-400 dark:to-rose-300 md:text-6xl">
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
            <Toast
              data={{
                message: "Must specify at least one account",
                type: "error",
              }}
            ></Toast>
          </div>
        }
      ></HomeLayout>
    </div>
  );
};

export default Home;
