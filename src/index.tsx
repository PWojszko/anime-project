import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FetchContextProvider from "./contexts/FetchContext";
import AuthContextProvider from "./contexts/AuthContext";
import RWDContextProvider from "./contexts/RWDContext";

import App from "./layouts/App";
import "./assets/scss/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FetchContextProvider>
        <AuthContextProvider>
          <RWDContextProvider>
            <App />
          </RWDContextProvider>
        </AuthContextProvider>
      </FetchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
