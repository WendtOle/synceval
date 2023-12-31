import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { AuthenticationWrapper } from "./components/AuthenticationWrapper";
import { BrowserRouter } from "react-router-dom";
import { Preload } from "./Preload";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AuthenticationWrapper>
      <BrowserRouter>
        <Preload />
        <App />
      </BrowserRouter>
    </AuthenticationWrapper>
  </React.StrictMode>,
);
