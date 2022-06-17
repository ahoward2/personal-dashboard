import React from "react";
import axios from "axios";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { Navigate } from "@tanstack/react-location";

export const routes = [
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    element: <Navigate to="/" />,
  },
];
