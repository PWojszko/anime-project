import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const { register, isAuth } = useAuthContext();

  //redirect
  const shouldRedirect = !isAuth;
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  });

  return (
    <div className="userpanel-page">
      <h1>User panel</h1>
    </div>
  );
}
