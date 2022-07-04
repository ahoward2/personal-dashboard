import React from "react";
import { copyToClipboard } from "../../lib/CopyToClipboard";

const Clipper = () => {
  return (
    <button
      onClick={async () => {
        await copyToClipboard(window.location.toString());
      }}
      className="w-full border border-sky-900 py-1 text-purple-800 dark:border-teal-300 dark:bg-black dark:text-rose-300"
    >
      Copy Dashboard To Clipboard
    </button>
  );
};

export { Clipper };
