import React from "react";
import { Toast } from "./Toast";
import toast from "react-hot-toast";

export type ShowToast = {
  message: string;
  type: "success" | "error" | "info";
};

declare global {
  interface WindowEventMap {
    showToast: CustomEvent<ShowToast>;
  }
}

export const handleShowToast = (e: CustomEvent<ShowToast>) => {
  let showingToast = true;
  setTimeout(() => {
    showingToast = false;
  }, 3000);
  toast.custom((t) => (
    <Toast toast={t} isShowing={showingToast} eventDetail={e.detail}></Toast>
  ));
};
