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
import UserPanelPage from "../pages/UserPanelPage";

function App() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userpanel" element={<UserPanelPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
