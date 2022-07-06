import React, { Suspense } from "react";
import {
  ReactLocation,
  Router,
  Outlet,
  Navigate,
} from "@tanstack/react-location";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { getDetails } from "./lib/GetDetails";
import Loading from "./components/Loading/Loading";
const Home = React.lazy(() => import("./pages/home"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));
import { ThemeContextProvider } from "./contexts/ThemeContext";

const location = new ReactLocation();
const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router
          location={location}
          routes={[
            {
              path: "/",
              element: async () => (
                <Suspense
                  fallback={
                    <Loading /> /* Loads so fast making this is a little janky */
                  }
                >
                  <Home></Home>
                </Suspense>
              ),
            },
            {
              path: "dashboard",
              element: async () => (
                <Suspense
                  fallback={
                    <Loading /> /* Loads so fast making this is a little janky */
                  }
                >
                  <Dashboard></Dashboard>
                </Suspense>
              ),
              loader: ({ search: { github, gitlab, twitter } }) =>
                queryClient.getQueryData([
                  "details",
                  github,
                  gitlab,
                  twitter,
                ]) ??
                queryClient.fetchQuery(
                  ["details", github, gitlab, twitter],
                  () => getDetails({ github, gitlab, twitter }),
                  { staleTime: 43200 * 1000 }
                ),
            },
            {
              element: <Navigate to="/" />,
            },
          ]}
        >
          <Outlet />
          {process.env.NODE_ENV === "development" && (
            // <ReactQueryDevtools initialIsOpen={false} />
            <ReactLocationDevtools initialIsOpen={false} />
          )}
        </Router>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
};

export default App;
