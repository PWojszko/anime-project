import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login, isAuth } = useAuthContext();

  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = ref;
  const passwordRef = ref;

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
    <div>
      <div>
        <p>Login</p>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Password
            <input type="password" ref={passwordRef} required />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
