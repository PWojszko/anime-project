import React from "react";
import { NavLink, Link } from "react-router-dom";

// import SearchAnime from "../components/SearchAnime.tsx";
// import { useAuth } from "../contexts/AuthContext.tsx";

import { useAuthContext } from "../contexts/AuthContext";

const list = [{ name: "Start", path: "/", exact: true }];

const Navigation = () => {
  const { isAuth, currentUser, logout } = useAuthContext();

  // const menu = list.map((element, index) => (
  //   <li key={index}>
  //     <NavLink to={element.path} exact={element.exact ? element.exact : false}>
  //       {element.name}
  //     </NavLink>
  //   </li>
  // ));

  const navButtons = (
    <>
      {isAuth ? (
        <>
          <Link to="/userpanel">
            <button className="button header__login-button">
              <span className="button__title">{currentUser}</span>
              <span className="button__subtitle">User Panel</span>
            </button>
          </Link>
          <button onClick={logout} className="button header__login-button">
            <span className="button__title">Log out</span>
            <span className="button__subtitle">Log out</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="button header__login-button">
              <span className="button__title">Log in</span>
              <span className="button__subtitle">Log in</span>
            </button>
          </Link>
          <Link to="/signup">
            <button className="button header__register-button">
              <span className="button__title">Sign in</span>
              <span className="button__subtitle">Sign in</span>
            </button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="header__nav">
      {navButtons}
      {/* <SearchAnime /> */}
    </nav>
  );
};

export default Navigation;
