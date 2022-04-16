import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const { register, isAuth } = useAuthContext();

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  function hadleCreateAccount(e: { preventDefault: () => void }) {
    e.preventDefault();
    register(
      emailRef?.current.value,
      passwordRef?.current.value,
      passwordConfirmRef?.current?.value
    );
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
    <div className="register-page">
      <h1>Create account</h1>
      <form onSubmit={hadleCreateAccount}>
        <label>
          <input
            type="email"
            ref={emailRef}
            required
            placeholder="Email"
            autoFocus
          />
        </label>
        <label>
          <input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            ref={passwordConfirmRef}
            required
            placeholder="Repeat Password"
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
