import React from "react";
import { useNavigate } from "@tanstack/react-location";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { searchEvent } from "../../lib/analytics/gtag";

interface SearchFromInputs {
  github: string;
  gitlab: string;
  twitter: string;
}
const schema = yup
  .object({
    github: yup.string(),
    gitlab: yup.string(),
    twitter: yup.string(),
  })
  .required();

const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchFromInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.github === "" && data.gitlab === "" && data.twitter === "") {
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            message: "Must provide at least 1 account!",
            type: "error",
          },
        })
      );
      return;
    }

    let navigateString = `/dashboard?`;
    let accountCount = 0;

    const { github, gitlab, twitter } = data ?? {};

    if (github !== "") {
      if (accountCount > 0) {
        navigateString += `&`;
      }
      navigateString += `github=${github}`;
      accountCount += 1;
    }

    if (gitlab !== "") {
      if (accountCount > 0) {
        navigateString += `&`;
      }
      navigateString += `gitlab=${gitlab}`;
      accountCount += 1;
    }

    if (twitter !== "") {
      if (accountCount > 0) {
        navigateString += `&`;
      }
      navigateString += `twitter=${twitter}`;
      accountCount += 1;
    }

    searchEvent({ term: navigateString });

    navigate({
      to: navigateString,
    });
  };

  return (
    <form
      className="mx-auto flex w-full flex-col p-2 md:flex-row lg:w-4/5"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div className="flex flex-grow flex-col px-2 pb-4 md:pb-0">
        <input
          type="text"
          className="dark:text-gray appearance-none rounded border-none bg-gray-300 text-black focus:border-sky-700 focus:outline-none focus:ring-sky-700 dark:bg-gray-700 dark:text-white dark:focus:border-teal-400  dark:focus:ring-teal-400"
          placeholder="Github Username"
          {...register("github")}
        />
      </div>
      <div className="flex flex-grow flex-col px-2 pb-4 md:pb-0">
        <input
          type="text"
          className="dark:text-gray appearance-none rounded border-none bg-gray-300 text-black focus:border-sky-700 focus:outline-none focus:ring-sky-700 dark:bg-gray-700 dark:text-white dark:focus:border-teal-400  dark:focus:ring-teal-400"
          placeholder="Gitlab Username"
          {...register("gitlab")}
        />
      </div>
      <div className="flex flex-grow flex-col px-2 md:pb-0">
        <input
          type="text"
          className="dark:text-gray appearance-none rounded border-none bg-gray-300 text-black focus:border-sky-700 focus:outline-none focus:ring-sky-700 dark:bg-gray-700 dark:text-white dark:focus:border-teal-400  dark:focus:ring-teal-400"
          placeholder="Twitter Username"
          {...register("twitter")}
        />
      </div>
      <div className="flex w-full px-2 pt-4 md:w-24 md:py-0 md:pl-0 md:pr-2">
        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black  md:mt-0 md:ml-2 md:self-end"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export { SearchForm };
