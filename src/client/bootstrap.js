import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.css";

if (process.env.MOCK_ENV === "on") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
