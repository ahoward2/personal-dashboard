// @ts-nocheck
import React from "react";
import {
  ReactLocation,
  Router,
  Outlet,
  Navigate,
} from "@tanstack/react-location";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import Home from "./pages/home";
import axios from "axios";
import Dashboard from "./pages/dashboard";

const location = new ReactLocation();

const queryClient = new QueryClient();

async function getDetails(gh, gl, tw) {
  return await axios.get(`api/details?github=${gh}&gitlab=${gl}&twitter=${tw}`);
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={[
          {
            path: "/",
            exact: true,
            element: <Home />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: ({ search: { github, gitlab, twitter } }) =>
              queryClient.getQueryData(["details", github, gitlab, twitter]) ??
              queryClient.fetchQuery(
                ["details", github, gitlab, twitter],
                () => getDetails(github, gitlab, twitter),
                { staleTime: 43200 * 1000 }
              ),
          },
          {
            element: <Navigate to="/" />,
          },
        ]}
      >
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
        <ReactLocationDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
