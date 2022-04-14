import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FetchContextProvider from "../contexts/FetchContext";

import Header from "./Header";
import { HomePage } from "../pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/anime/:id" element={AnimePage} /> */}
        {/* <Route path="/signup">
          {isAuth ? <Redirect to="/" /> : <Signup />}
        </Route> */}
        {/* <Route path="/login">{isAuth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/userpanel">
          {!isAuth ? <Redirect to="/" /> : <UserPanel />}
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
