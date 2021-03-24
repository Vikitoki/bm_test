import React from "react";
import ReactDOM from "react-dom";

import "./styles/default/style.scss";
import "./styles/default/variables.scss";

import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
