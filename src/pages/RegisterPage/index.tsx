import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const { register, isAuth } = useAuthContext();

  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = ref;
  const passwordRef = ref;
  const passwordConfirmRef = ref;

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
    <div>
      <div>
        <p>Create account</p>
        <form onSubmit={hadleCreateAccount}>
          <label>
            Email
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Password
            <input type="password" ref={passwordRef} required />
          </label>
          <label>
            Password Confirmation
            <input type="password" ref={passwordConfirmRef} required />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
