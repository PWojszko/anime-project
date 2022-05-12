import React from "react";
import { NavLink, Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
// import { useAuth } from "../contexts/AuthContext.tsx";
import SlidingButton from "../components/SlidingButton";

import { useAuthContext } from "../contexts/AuthContext";

import {
  BsArrowBarRight,
  BsPersonPlusFill,
  BsPersonLinesFill,
  BsDoorOpenFill,
} from "react-icons/bs";

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
            <div className="navigation__item">
              <BsPersonLinesFill />
              <SlidingButton
                firstText={currentUser?.toString()}
                secondText="User Panel"
              />
            </div>
          </Link>

          <div onClick={logout} className="logout">
            <div className="navigation__item">
              <BsDoorOpenFill />
              <SlidingButton firstText="Log out" secondText="Sure?" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/login">
            <div className="navigation__item">
              <BsArrowBarRight />
              <SlidingButton firstText="Log in" secondText="Log in" />
            </div>
          </Link>

          <Link to="/register">
            <div className="navigation__item">
              <BsPersonPlusFill />
              <SlidingButton firstText="Sign in" secondText="Sign in" />
            </div>
          </Link>
        </>
      )}
    </>
  );

  return <nav className="navigation">{navButtons}</nav>;
};

export default Navigation;
