import React, { useRef, useEffect, useCallback, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

enum FormValues {
  email = "email",
  password = "password",
}

export default function LoginPage() {
  const { login, isAuth } = useAuthContext();
  const [formData, setFormData] = useState({
    [FormValues.email]: "",
    [FormValues.password]: "",
  });

  const handleOnInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
  }

  //redirect
  const shouldRedirect = isAuth;
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  });

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-page__form" onSubmit={handleLogin}>
        <label className="login-page__label login-page__label--email">
          <input
            className="login-page__input login-page__input--email"
            type="email"
            name={FormValues.email}
            onChange={handleOnInputChange}
            required
            autoFocus
            placeholder="Email"
          />
        </label>
        <label className="login-page__label login-page__label--password">
          <input
            className="login-page__input login-page__input--password"
            type="password"
            name={FormValues.password}
            onChange={handleOnInputChange}
            required
            placeholder="Password"
          />
        </label>
        <button className="login-page__submit" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
