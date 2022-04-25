import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

enum FormValues {
  email = "email",
  password = "password",
  passwordRepeat = "passwordRepeat",
}

export default function RegisterPage() {
  const { register, isAuth } = useAuthContext();

  const [formData, setFormData] = useState({
    [FormValues.email]: "",
    [FormValues.password]: "",
    [FormValues.passwordRepeat]: "",
  });

  function hadleCreateAccount(e: { preventDefault: () => void }) {
    e.preventDefault();
    const { email, password, passwordRepeat } = formData;
    register(email, password, passwordRepeat);
  }

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            name={FormValues.email}
            onChange={handleOnInputChange}
            required
            placeholder="Email"
            autoFocus
          />
        </label>
        <label>
          <input
            type="password"
            name={FormValues.password}
            onChange={handleOnInputChange}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            name={FormValues.passwordRepeat}
            onChange={handleOnInputChange}
            required
            placeholder="Repeat Password"
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
