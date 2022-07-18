import React from "react";

type CardProps = {
  data: {
    [key: string]: string | number;
  };
};

const AccountCard = ({ data }: CardProps) => {
  return (
    <div className="h-full w-full rounded border-2 border-indigo-700 bg-white p-2 dark:border-teal-300 dark:bg-black md:p-4">
      <ul>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <li className="flex justify-between" key={key}>
              <p className="text-left text-indigo-700 dark:text-teal-300">
                {key}
              </p>
              <p className="text-right text-fuchsia-700 dark:text-rose-300">
                {value}
              </p>
            </li>
          ))}
        ;
      </ul>
    </div>
  );
};

export default AccountCard;
