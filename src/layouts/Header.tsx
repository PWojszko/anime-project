import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation";
import SearchBar from "../components/SearchBar";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((prev) => !prev);

  const setActiveButton: JSX.Element = (
    <div className="header__button" onClick={handleClick}>
      <div className="header__button-line header__button-line-1"></div>
      <div className="header__button-line header__button-line-2"></div>
      <div className="header__button-line header__button-line-3"></div>
      <div className="header__button-line header__button-line-4"></div>
    </div>
  );

  return (
    <header
      className={isActive ? "header header--active" : "header header--inactive"}
    >
      <div className="header__logo-container">
        <Link to="/">
          <div className="header__logo">
            Ani <span className="header__logo--bold">me</span>
          </div>
        </Link>
      </div>
      <SearchBar />
      <Navigation />
      {setActiveButton}
    </header>
  );
};

export default Header;
