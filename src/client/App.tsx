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
import { GlobalStyle } from "./App.styles";
import Loading from "./components/Loading/Loading";
const Home = React.lazy(() => import("./pages/home"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));

const location = new ReactLocation();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router
        location={location}
        routes={[
          {
            path: "/",
            element: async () => (
              <Suspense
                fallback={
                  <Loading /> /* Make this a <Navigate to='/failure'/> */
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
                  <Loading /> /* Make this a <Navigate to='/failure'/> */
                }
              >
                <Dashboard></Dashboard>
              </Suspense>
            ),
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
