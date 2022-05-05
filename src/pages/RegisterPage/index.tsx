import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const registerForm = (
    <form className="register-page__form" onSubmit={hadleCreateAccount}>
      <label className="register-page__label register-page__label--email">
        <input
          className="register-page__input register-page__input--email"
          type="email"
          name={FormValues.email}
          onChange={handleOnInputChange}
          required
          placeholder="Email"
          autoFocus
        />
      </label>
      <label className="register-page__label register-page__label--password">
        <input
          className="register-page__input register-page__input--password"
          type="password"
          name={FormValues.password}
          onChange={handleOnInputChange}
          required
          placeholder="Password"
        />
      </label>
      <label className="register-page__label register-page__label--password-repeat">
        <input
          className="register-page__input register-page__input--password-repeat"
          type="password"
          name={FormValues.passwordRepeat}
          onChange={handleOnInputChange}
          required
          placeholder="Repeat Password"
        />
      </label>
      <button className="register-page__submit button" type="submit">
        Sign up
      </button>
    </form>
  );

  return (
    <div className="register-page">
      <div className="register-page__title-container">
        <h1 className="register-page__title">Sign in</h1>
      </div>
      <div className="register-page__form-container">
        {registerForm}
        <div className="register-page__redirect">
          <div className="register-page__redirect-container">
            <p className="register-page__text">Already have an account?</p>
            <Link to="/login">
              <button className="register-page__button button">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
