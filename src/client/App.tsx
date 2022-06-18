import React from "react";
import {
  ReactLocation,
  Router,
  Outlet,
  Navigate,
} from "@tanstack/react-location";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { getDetails } from "./lib/GetDetails";

const location = new ReactLocation();

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={[
          {
            path: "/",
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
