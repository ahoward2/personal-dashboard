import React from "react";

import { ReactLocation, Router, Outlet } from "@tanstack/react-location";
import { QueryClientProvider, QueryClient } from "react-query";
import { routes } from "./routes";

import { ReactQueryDevtools } from "react-query/devtools";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";

const location = new ReactLocation();

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <ReactLocationDevtools initialIsOpen={false} /> */}
      </Router>
    </QueryClientProvider>
  );
};

export default App;
