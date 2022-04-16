import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useFetchContext } from "../contexts/FetchContext";
import { useAuthContext } from "../contexts/AuthContext";

import Header from "./Header";
import Footer from "./Footer";
import { HomePage } from "../pages/HomePage";
import { AnimePage } from "../pages/AnimePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        {/* <Route path="/signup">
          {isAuth ? <Redirect to="/" /> : <Signup />}
        </Route> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/userpanel">
          {!isAuth ? <Redirect to="/" /> : <UserPanel />}
        </Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
