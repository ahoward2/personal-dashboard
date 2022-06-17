import React from "react";

import {
  createMemoryHistory,
  ReactLocation,
  Router,
  Outlet,
} from "@tanstack/react-location";
import { routes } from "./routes";

import { ReactLocationDevtools } from "@tanstack/react-location-devtools";

// const history = createMemoryHistory();
const location = new ReactLocation();

const App = () => {
  return (
    <Router location={location} routes={routes}>
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};

export default App;
