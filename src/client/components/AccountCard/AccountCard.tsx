import React from "react";

type CardProps = {
  data: {
    [key: string]: string | number;
  };
  title: string;
};

const AccountCard = ({ data, title }: CardProps) => {
  return (
    <div className="h-full w-full rounded border-none bg-gray-300 p-2 dark:border-teal-300 dark:bg-gray-700 md:p-4">
      <div>
        <label className="text-xl font-black text-black dark:text-white">
          {title ?? "Title"}
        </label>
      </div>
      <ul>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <li className="flex justify-between" key={key}>
              <p className="text-left font-normal text-black dark:text-white">
                {key}
              </p>
              <p className="font-extrathin text-right text-gray-700 dark:text-gray-400">
                {value}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AccountCard;
