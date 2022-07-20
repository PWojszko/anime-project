import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

// context
import AuthContextProvider from "./contexts/AuthContext";
import RWDContextProvider from "./contexts/RWDContext";

//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./layouts/App";
import "./assets/scss/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <RWDContextProvider>
            <App />
          </RWDContextProvider>
        </AuthContextProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
