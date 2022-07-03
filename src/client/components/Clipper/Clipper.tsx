import React from "react";
import { copyToClipboard } from "../../lib/CopyToClipboard";

const Clipper = () => {
  return (
    <button
      onClick={async () => {
        await copyToClipboard(window.location.toString());
      }}
      className="w-full border border-green-700 py-1 text-blue-700 dark:border-green-500 dark:bg-black dark:text-yellow-400"
    >
      Copy Dashboard To Clipboard
    </button>
  );
};

export { Clipper };
