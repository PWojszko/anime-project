import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useFetchContext } from "../contexts/FetchContext";
import { useAuthContext } from "../contexts/AuthContext";

import Header from "./Header";
import { HomePage } from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/anime/:id" element={AnimePage} /> */}
        {/* <Route path="/signup">
          {isAuth ? <Redirect to="/" /> : <Signup />}
        </Route> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/userpanel">
          {!isAuth ? <Redirect to="/" /> : <UserPanel />}
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
