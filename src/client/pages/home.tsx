import React, { useEffect } from "react";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Header from "../components/Header/Header";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { Message } from "../components/Message/Message";
import { Toaster } from "react-hot-toast";
import { handleShowToast } from "../components/Toast/Events";

const Home = () => {
  useEffect(() => {
    window.addEventListener("showToast", handleShowToast);
    return () => {
      window.removeEventListener("showToast", handleShowToast);
    };
  }, []);

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
            <Toaster position="bottom-center" />
          </div>
        }
      ></HomeLayout>
    </div>
  );
};

export default Home;
