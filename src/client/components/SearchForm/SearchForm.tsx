import React from "react";
import { useNavigate } from "@tanstack/react-location";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

    navigate({
      to: navigateString,
    });
  };

  return (
    <form
      className="mx-auto flex w-full flex-col p-2 md:flex-row lg:w-4/5"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div className="flex flex-col px-2">
        <label className="text-indigo-700 dark:text-teal-400">Github</label>
        <input
          type="text"
          className="border-1 appearance-none rounded border border-indigo-700 bg-white text-indigo-700 focus:border-teal-400 dark:border-teal-400 dark:bg-black dark:text-teal-400"
          {...register("github")}
        />
      </div>
      <div className="flex flex-col px-2">
        <label className="text-indigo-700 dark:text-teal-400">Gitlab</label>
        <input
          type="text"
          className="border-1 appearance-none rounded border border-indigo-700 bg-white text-indigo-700 focus:border-teal-400 dark:border-teal-400 dark:bg-black dark:text-teal-400"
          {...register("gitlab")}
        />
      </div>
      <div className="flex flex-col px-2">
        <label className="text-indigo-700 dark:text-teal-400">Twitter</label>
        <input
          type="text"
          className="border-1 appearance-none rounded border border-indigo-700 bg-white text-indigo-700 focus:border-teal-400 dark:border-teal-400 dark:bg-black dark:text-teal-400"
          {...register("twitter")}
        />
      </div>
      <div className="flex w-full px-2 pt-4 md:py-0 md:pl-0 md:pr-2">
        <button
          type="submit"
          className="border-1 w-full rounded border border-indigo-700 bg-white px-4 py-2 text-indigo-700 hover:bg-indigo-700 hover:text-white dark:border-teal-400 dark:bg-black dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-black md:mt-0 md:ml-2 md:self-end"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export { SearchForm };
