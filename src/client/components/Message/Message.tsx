import React from "react";

type MessageProps = {
  title: string;
  content: string;
};

export const Message = ({ title, content }: MessageProps) => {
  return (
    <div className="w-full rounded border-2 border-indigo-700 bg-white p-4 dark:border-rose-300 dark:bg-black">
      <p className="font-extrabold text-indigo-700 dark:text-rose-300">
        {title}
      </p>
      <p className="font-extralight text-black dark:text-white">{content}</p>
    </div>
  );
};
