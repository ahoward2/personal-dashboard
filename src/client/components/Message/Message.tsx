import React from "react";

type MessageProps = {
  title: string;
  content: string;
};

export const Message = ({ title, content }: MessageProps) => {
  return (
    <div className="w-full rounded border-2 border-black bg-white p-4 dark:border-white dark:bg-slate-900">
      <p className="font-extrabold text-black dark:text-white">{title}</p>
      <p className="font-extralight text-black dark:text-white">{content}</p>
    </div>
  );
};
