import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login, isAuth } = useAuthContext();

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    login(emailRef?.current?.value, passwordRef?.current?.value);
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
            ref={emailRef}
            required
            autoFocus
            placeholder="Email"
          />
        </label>
        <label className="login-page__label login-page__label--password">
          <input
            className="login-page__input login-page__input--password"
            type="password"
            ref={passwordRef}
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
